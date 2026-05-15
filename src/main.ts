import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

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

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
