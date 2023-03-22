import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
require('dotenv').config();

async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   app.enableCors();

   app.useGlobalPipes(new ValidationPipe());

   app.use(graphqlUploadExpress({ maxFileSize: 7000000 })); // 7Mo
   app.use(express.static(join(process.cwd(), process.env.UPLOADS_FOLDER))); // avoir accès au img "http://localhost:4000/profileImg/'img name'"
   await app.listen(4000).then(() => console.log('Listening PORT : 4000'));
}
bootstrap();
