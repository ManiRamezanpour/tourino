import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupDocument(app: INestApplication, route: string) {
  const configDocument = new DocumentBuilder()
    .setTitle('Tourino - API - DOCS')
    .setDescription('The API FOR TORUINO PROJECTS')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, configDocument);
  SwaggerModule.setup(route, app, document);
}
