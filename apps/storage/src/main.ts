import { mkdir } from 'node:fs/promises';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/modules/app.module';
import { S3_STORAGE } from '@/common/const';

const PORT = process.env.PORT ?? 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    routeResolutionStrategy: 'specificity',
    routeConflictPolicy: { duplicate: 'error', shadow: 'warn' },
    cors: { origin: '*' },
  });

  await mkdir(S3_STORAGE, { recursive: true });

  await app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nest.js app running on port ${PORT}`);
  });
}
void bootstrap();
