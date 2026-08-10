# MSQDX UI — always-on Storybook (static) for Coolify / self-hosted.
# Context: repository root (msqdx-ui).
# Build:  docker build -t msqdx-ui-storybook .
# Run:    docker run --rm -p 6006:6006 msqdx-ui-storybook
#
# Multi-stage: pnpm workspace builds @msqdx/ui-tokens + @msqdx/ui, then
# `build-storybook`, then nginx serves `packages/ui/storybook-static`.
# Coolify: Dockerfile path `Dockerfile`, container port **6006**,
# domain https://ds.projects-a.plygrnd.tech
# (see knowledge/staging-coolify-storybook.md).
#
# This image is for Storybook hosting only. Product app Dockerfiles that
# `git clone` this repo for source (audion-v3 / checkion-v3 / …) are unchanged.

ARG NODE_IMAGE=node:22-bookworm-slim
ARG NGINX_IMAGE=nginx:1.27-alpine

# ---- Base (pnpm via corepack) ----
FROM ${NODE_IMAGE} AS base
WORKDIR /workspace
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/* \
    && corepack enable

# ---- Builder: packages + static Storybook ----
FROM base AS builder
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY packages ./packages
COPY scripts ./scripts

# DevDeps required for tsc + Storybook/Vite build (Coolify may inject NODE_ENV=production).
# pnpm 10 blocks dependency postinstalls unless allowlisted in package.json
# (`pnpm.onlyBuiltDependencies`). Without esbuild's install.js, Vite/Storybook
# dies mid-chunk (Coolify often reports exit 255 with a truncated log).
ENV NODE_ENV=development
RUN pnpm install --frozen-lockfile \
    && pnpm rebuild esbuild

# Cap heap for Coolify hosts (~4–8 GB). Higher values invite cgroup OOM (exit 255).
ENV NODE_OPTIONS=--max-old-space-size=4096
ENV NODE_ENV=production
RUN pnpm build \
    && pnpm build-storybook \
    && test -f /workspace/packages/ui-tokens/dist/index.js \
    && test -f /workspace/packages/ui/dist/index.js \
    && test -f /workspace/packages/ui/storybook-static/index.html

# ---- Runner: static nginx (cheap always-on) ----
FROM ${NGINX_IMAGE} AS runner
COPY docker/nginx-storybook.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /workspace/packages/ui/storybook-static /usr/share/nginx/html

ENV PORT=6006
EXPOSE 6006

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:6006/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
