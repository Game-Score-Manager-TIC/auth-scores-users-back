import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', // Cambia a tu dominio en producción
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Configuración básica de Swagger
  const config = new DocumentBuilder()
    .setTitle('Game Score API')
    .setDescription('REST API for Game Score API')
    .setVersion('1.3.16')
    .addServer("/api/v1")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableVersioning().setGlobalPrefix('api/v1');
  app.use('/uploads', express.static(path.join(__dirname, '..', '..', '/dist/uploads')));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
