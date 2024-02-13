import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import ynv from 'src/config//envConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = ynv.server.port;
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  console.log(`🚀 APP START port : ${port}`);
}
bootstrap();
