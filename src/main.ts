import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

const logger = new Logger('Main');

bootstrap()
  .then(() => logger.log(`BOOTSTRAP_SUCCESS`))
  .catch((error) => {
    logger.error(`BOOTSTRAP_ERROR ${error}`);
  });
