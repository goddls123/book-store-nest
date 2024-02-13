import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import ynv from 'src/config//envConfig';
import { LoggerService } from './common/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = ynv.server.port;
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  Logger.log(`🚀 APP START port : ${port}`);
}
bootstrap();
