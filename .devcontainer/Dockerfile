FROM mcr.microsoft.com/devcontainers/typescript-node:24-trixie

# Install base tools + file watching tools
# RUN apt-get update && \
#     apt-get install -y \
#     nginx && \
#     apt-get clean && rm -rf /var/lib/apt/lists/*

RUN corepack enable

COPY nginx.devcontainer.conf /etc/nginx/nginx.conf