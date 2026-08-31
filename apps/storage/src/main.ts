import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    routeResolutionStrategy: 'specificity',
    routeConflictPolicy: { duplicate: 'error', shadow: 'warn' },
  });
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
