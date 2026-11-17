# ------------------------------------
# ---------- Stage 1: Build ----------
# ------------------------------------
FROM node:lts-alpine3.22 AS builder

WORKDIR /app

# Copy package files first for caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/server/package.json ./apps/server/package.json

COPY packages/data/package.json ./packages/data/package.json
COPY packages/env/package.json ./packages/env/package.json
COPY packages/types/package.json ./packages/types/package.json
COPY packages/utils/package.json ./packages/utils/package.json

COPY configs/eslint-config/package.json ./configs/eslint-config/package.json
COPY configs/prettier-config/package.json ./configs/prettier-config/package.json
COPY configs/tsup-config/package.json ./configs/tsup-config/package.json
COPY configs/typescript-config/package.json ./configs/typescript-config/package.json
COPY configs/vitest-config/package.json ./configs/vitest-config/package.json

# Install pnpm and all dependencies (dev + prod)
RUN corepack enable
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Declare build args (secrets for prerender)
ARG VITE_STORAGE_APP_HOST
ARG VITE_WEB_APP_HOST
ARG VITE_SERVER_APP_HOST
ARG DATABASE_URL
ARG STORAGE_APP_HOST
ARG WEB_APP_HOST
ARG SERVER_APP_HOST
ARG TOKEN_SECRET
ARG SALT_ROUND
ARG TURBO_TEAM
ARG TURBO_TOKEN
ARG FTP_HOST
ARG FTP_PORT
ARG FTP_USER
ARG FTP_PASSWORD


# Set temporary ENV for build (not persisted in final image)
ENV \
  VITE_STORAGE_APP_HOST=$VITE_STORAGE_APP_HOST \
  VITE_WEB_APP_HOST=$VITE_WEB_APP_HOST \
  VITE_SERVER_APP_HOST=$VITE_SERVER_APP_HOST \
  DATABASE_URL=$DATABASE_URL \
  STORAGE_APP_HOST=$STORAGE_APP_HOST \
  WEB_APP_HOST=$WEB_APP_HOST \
  SERVER_APP_HOST=$SERVER_APP_HOST \
  TOKEN_SECRET=$TOKEN_SECRET \
  FTP_HOST=$FTP_HOST \
  FTP_PORT=$FTP_PORT \
  FTP_USER=$FTP_USER \
  FTP_PASSWORD=$FTP_PASSWORD \
  SALT_ROUND=$SALT_ROUND

# Create a env file at the root of the proj
RUN cat > .env.production <<EOF
VITE_STORAGE_APP_HOST=$VITE_STORAGE_APP_HOST
VITE_WEB_APP_HOST=$VITE_WEB_APP_HOST
VITE_SERVER_APP_HOST=$VITE_SERVER_APP_HOST
DATABASE_URL=$DATABASE_URL
STORAGE_APP_HOST=$STORAGE_APP_HOST
WEB_APP_HOST=$WEB_APP_HOST
SERVER_APP_HOST=$SERVER_APP_HOST
SALT_ROUND=$SALT_ROUND
TOKEN_SECRET=$TOKEN_SECRET
FTP_HOST=$FTP_HOST
FTP_PORT=$FTP_PORT
FTP_USER=$FTP_USER
FTP_PASSWORD=$FTP_PASSWORD
EOF

# Build app (uses build-time ENV)
RUN pnpm build --filter server











# -----------------------------------------
# ---------- Stage 2: Production ----------
# -----------------------------------------
FROM node:lts-alpine3.22 AS runner

WORKDIR /app

# Install pnpm (needed to serve)
RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/server/package.json ./apps/server/package.json

COPY packages/data/package.json ./packages/data/package.json
COPY packages/env/package.json ./packages/env/package.json
COPY packages/types/package.json ./packages/types/package.json
COPY packages/utils/package.json ./packages/utils/package.json

# install prod deps
RUN pnpm install --prod --frozen-lockfile

# Copy built output from builder
COPY --from=builder /app/apps/server/dist ./apps/server/dist

COPY --from=builder /app/packages/data/dist ./packages/data/dist
COPY --from=builder /app/packages/env/dist ./packages/env/dist
COPY --from=builder /app/packages/types/dist ./packages/types/dist
COPY --from=builder /app/packages/utils/dist ./packages/utils/dist

ENV PORT=3000

EXPOSE $PORT

ENTRYPOINT ["node","apps/server/dist/index.mjs"]
