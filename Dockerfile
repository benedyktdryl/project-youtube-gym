# syntax=docker/dockerfile:1.7-labs

FROM node:22-slim AS base
WORKDIR /app
ENV NODE_ENV=development
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
  npm ci --no-progress

FROM base AS lint
COPY . .
RUN npm run lint

FROM lint AS build
RUN npm run build

FROM lint AS tools

FROM gcr.io/distroless/nodejs22-debian12 AS runner
WORKDIR /app
ENV NODE_ENV=production PORT=3000
COPY --from=build /app/build ./build
COPY --from=build /app/server.mjs ./server.mjs
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/package-lock.json ./package-lock.json
EXPOSE 3000
CMD ["server.mjs"]
