import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import ynv from 'src/config//envConfig';
import { winstonConfig } from './config/winstonConfig';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(
    AppModule,
    winstonConfig,
  );
  const port = ynv.server.port;
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  Logger.log(`🚀 APP START port : ${port}`);
}
bootstrap();
