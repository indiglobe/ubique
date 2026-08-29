FROM mcr.microsoft.com/devcontainers/typescript-node:22-trixie

# Install base tools + file watching tools
RUN apt-get update && \
    apt-get install -y \
    apt-get clean && rm -rf /var/lib/apt/lists/*

RUN corepack enable

ENV PLATFORM=devcontainer