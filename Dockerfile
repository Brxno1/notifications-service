FROM bitnami/node:latest AS base

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS development
COPY . .
RUN pnpm prisma generate
EXPOSE 3333
CMD ["pnpm", "start:dev"]

FROM base AS build
COPY . .
RUN pnpm prisma generate
RUN pnpm build

FROM bitnami/node:latest AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

FROM node:20-alpine AS production
WORKDIR /app

RUN apk add --no-cache dumb-init

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package.json ./package.json

EXPOSE 3333

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/src/main.js"]
