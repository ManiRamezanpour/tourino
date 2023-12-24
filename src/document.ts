import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupDocument(app: INestApplication, route: string) {
  const configDocument = new DocumentBuilder()
    .setTitle('Tourino - API - DOCS')
    .setDescription('The API FOR TORUINO PROJECTS')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, configDocument);
  SwaggerModule.setup(route, app, document);
}
