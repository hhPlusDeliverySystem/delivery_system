/* eslint-disable prettier/prettier */
import { Module, Logger, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from './modules/delivery/delivery.entity';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { Review } from './modules/review/review.entity';
import { Store } from './modules/store/store.entity';
import { StoreModule } from './modules/store/store.module';
import { ReviewModule } from './modules/review/review.module';
import { DeliveryModule } from './modules/delivery/delivery.module';
import { MenuModule } from './modules/menu/menu.module';
import { Menu } from './modules/menu/menu.entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import { LoggerMiddleware } from './middleware/logger.middleware';

import * as winston from 'winston';
import { MyCartModule } from './modules/myCart/myCart.module';
import { EntitySchemaEmbeddedColumnOptions } from 'typeorm';
import { env } from 'process';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './middleware/exception.filter';
import { Bookmark } from './modules/bookmark/bookmark.entity';
import { BookmarkModule } from './modules/bookmark/bookmark.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config';
import { SlackService } from './utils/slack.service';
import { HttpModule } from '@nestjs/axios';

const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: ':memory:',
  entities: [Review, Delivery, Store, Menu],
  synchronize: true,
}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.dev'
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.RDS_HOST,
      port: 3306,
      username: process.env.RDS_USERNAME,
      password: process.env.RDS_PW,
      database: 'delivery_system',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
  }),
    ReviewModule,
    DeliveryModule,
    StoreModule,
    MenuModule,
    MyCartModule,
    HttpModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService, Logger,
    SlackService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}