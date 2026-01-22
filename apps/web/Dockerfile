# ---- deps ----
FROM node:20-bullseye AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml* ./
COPY . .

RUN pnpm install --frozen-lockfile

# ---- build ----
FROM node:20-bullseye AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=deps /app ./
RUN pnpm build

# ---- run ----
FROM node:20-bullseye AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app ./

EXPOSE 3000
CMD ["pnpm", "start"]
