import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: ['http://localhost:3001', 'https://crayfish-inspired-fly.ngrok-free.app/'] });
  app.useGlobalPipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true, whitelist: true }));
  app.setGlobalPrefix('api');
  await app.listen(3000);
}

bootstrap();
