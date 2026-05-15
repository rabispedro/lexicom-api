import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('LexiCOM API')
    .setDescription('API for learning english words')
    .setVersion('1.0')
    .build();

  const swaggerDocumentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, swaggerDocumentFactory);

  app.use(helmet());

  // Objeto de configuração: https://github.com/expressjs/cors#configuration-options
  app.enableCors({
    // origin: '*',
    origin: process.env.FRONTEND_ORIGIN ?? 'http://localhost:3333',
    methods: 'GET, POST, DELETE',
    preflightContinue: true,
    optionsSuccessStatus: 204,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
