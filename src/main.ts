import { NestFactory } from '@nestjs/core';
import { configDotenv } from 'dotenv';
import { setupDocument } from './document';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });
  configDotenv();
  const port = process.env.PORT || 3000;

  const DOCUMENT_ROUTE: string = '/api';
  const isDevelopmentMode: boolean =
    process.env.APP_MODE.toUpperCase() == 'DEVELOPMENT';
  if (isDevelopmentMode) setupDocument(app, DOCUMENT_ROUTE);
  await app.listen(port);

  const appUrl: string = isDevelopmentMode
    ? `http://127.0.0.1:${port}`
    : await app.getUrl();
  console.log(appUrl);
  isDevelopmentMode && console.log('DB IS CONNECTED !');
  console.log(`RestApi: http://localhost:${port}${DOCUMENT_ROUTE}`);
}
bootstrap();
