import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLoggerService } from './common/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = app.get(CustomLoggerService);
  app.useLogger(logger);

  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
