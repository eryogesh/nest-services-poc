import 'dotenv/config';

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { APIPrefix } from './constants/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
    }),
  );
  app.setGlobalPrefix(APIPrefix.Version);
  const port = parseInt(process.env.SERVER_PORT);
  await app.listen(port);
  Logger.log(`Server started at http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
