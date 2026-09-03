import { defineConfig } from 'taskforge-cli/config';
import os from 'node:os';

export default defineConfig({
  envDir: '../../',
  scripts: {
    dev: {
      execute: 'nest start --watch',
      envFile:
        os.platform() === 'linux' ? '.env.devcontainer' : '.env.development',
      envValues: {
        PORT: 15618,
      },
    },
    start: {
      execute: 'nest start',
      envFile: '.env.production',
      envValues: {
        NODE_ENV: 'production',
      },
    },
    build: {
      execute: 'nest build',
      envFile: '.env.production',
      envValues: {
        NODE_ENV: 'production',
      },
    },
  },
});
