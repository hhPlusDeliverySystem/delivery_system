import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';

import * as winston from 'winston'
import { createLogger } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { winstonLogger } from './utils/winston.util';
import * as dotenv from 'dotenv';
import { HttpExceptionFilter } from './middleware/exception.filter';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger,
  });

  const config = new DocumentBuilder()
    .setTitle('Swagger Example')
    .setDescription('Swagger study API description')
    .setVersion('1.0.0')
    .addTag('swagger')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
