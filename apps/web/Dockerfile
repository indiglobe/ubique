# ------------------------------------
# ---------- Stage 1: Build ----------
# ------------------------------------
FROM node:lts-alpine3.22 AS builder

WORKDIR /app

# Copy package files first for caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/web/package.json ./apps/web/package.json

COPY packages/data/package.json ./packages/data/package.json
COPY packages/env/package.json ./packages/env/package.json
COPY packages/styles/package.json ./packages/styles/package.json
COPY packages/types/package.json ./packages/types/package.json
COPY packages/ui/package.json ./packages/ui/package.json
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
ARG VITE_SOCKET_APP_HOST
ARG VITE_WEB_APP_HOST

ARG VITE_RAZOR_PAY_KEY

ARG BETTER_AUTH_SECRET
ARG BETTER_AUTH_URL

ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET

ARG DATABASE_URL

ARG SOCKET_APP_HOST
ARG WEB_APP_HOST

ARG RAZOR_PAY_KEY
ARG RAZOR_PAY_SECRET

ARG TOKEN_SECRET


# Set temporary ENV for build (not persisted in final image)
ENV \
  VITE_SOCKET_APP_HOST=$VITE_SOCKET_APP_HOST \
  VITE_WEB_APP_HOST=$VITE_WEB_APP_HOST \
  VITE_RAZOR_PAY_KEY=$VITE_RAZOR_PAY_KEY \
  BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET \
  BETTER_AUTH_URL=$BETTER_AUTH_URL \
  GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID \
  GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET \
  DATABASE_URL=$DATABASE_URL \
  SOCKET_APP_HOST=$SOCKET_APP_HOST \
  WEB_APP_HOST=$WEB_APP_HOST \
  RAZOR_PAY_KEY=$RAZOR_PAY_KEY \
  TOKEN_SECRET=$TOKEN_SECRET \
  RAZOR_PAY_SECRET=$RAZOR_PAY_SECRET

# Create a env file at the root of the proj
RUN cat > .env.production <<EOF
VITE_SOCKET_APP_HOST=$VITE_SOCKET_APP_HOST
VITE_WEB_APP_HOST=$VITE_WEB_APP_HOST

VITE_RAZOR_PAY_KEY=$VITE_RAZOR_PAY_KEY

BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET
BETTER_AUTH_URL=$BETTER_AUTH_URL

GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET

DATABASE_URL=$DATABASE_URL

SOCKET_APP_HOST=$SOCKET_APP_HOST
WEB_APP_HOST=$WEB_APP_HOST

RAZOR_PAY_KEY=$RAZOR_PAY_KEY
RAZOR_PAY_SECRET=$RAZOR_PAY_SECRET

TOKEN_SECRET=$TOKEN_SECRET
EOF

# Build app (uses build-time ENV)
RUN pnpm build --filter web



# -----------------------------------------
# ---------- Stage 2: Production ----------
# -----------------------------------------
FROM node:lts-alpine3.22 AS runner

WORKDIR /app

# Install pnpm (needed to serve)
RUN corepack enable

# Copy only package.json
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/web/package.json ./apps/web/package.json

COPY packages/data/package.json ./packages/data/package.json
COPY packages/env/package.json ./packages/env/package.json
COPY packages/styles/package.json ./packages/styles/package.json
COPY packages/ui/package.json ./packages/ui/package.json
COPY packages/utils/package.json ./packages/utils/package.json

# Copy built output from builder
COPY --from=builder /app/apps/web/dist ./apps/web/dist

COPY --from=builder /app/packages/data/dist ./packages/data/dist
COPY --from=builder /app/packages/env/dist ./packages/env/dist
COPY --from=builder /app/packages/styles/dist ./packages/styles/dist
COPY --from=builder /app/packages/ui/dist ./packages/ui/dist
COPY --from=builder /app/packages/utils/dist ./packages/utils/dist

# install prod deps
RUN pnpm install --prod --frozen-lockfile

ENV PORT=3000

EXPOSE $PORT

ENTRYPOINT ["node","apps/web/dist/server/index.mjs"]
