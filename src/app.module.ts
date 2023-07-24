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
import { ConfigModule } from '@nestjs/config';
import configuration from './config';

const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: ':memory:',
  entities: [Review, Delivery, Store, Menu],
  synchronize: true,
}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath : '.env.dev'
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
    ReviewModule,
    DeliveryModule,
    StoreModule,
    MenuModule,
    MyCartModule,
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('MyApp', {
              colors: true,
              prettyPrint: true,
            }),
          ),
        }),
        // other transports...
      ],
    }),
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService, Logger
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

console.log(process.env.RDS_HOST)
console.log(process.env.RDS_USERNAME)
console.log(process.env.RDS_PW)

