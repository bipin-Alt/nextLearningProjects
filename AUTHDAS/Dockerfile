FROM node:22-bookworm-slim
WORKDIR  /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN DATABASE_URL="postgresql://authdas:local_dev_password@db:5432/authdas?schema=public" \
   pnpm exec prisma generate --config prisma7.config.ts

EXPOSE 3000
CMD [ "pnpm", "dev"]

