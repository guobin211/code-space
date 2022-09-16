import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export async function setUpSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('NestJS Swagger API')
    .setDescription('Nestjs API 文档')
    .setVersion('1.0')
    .addTag('code-space')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
}
