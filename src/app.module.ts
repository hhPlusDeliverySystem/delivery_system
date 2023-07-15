/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
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

import * as winston from 'winston';

const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: ':memory:',
  entities: [Review, Delivery, Store, Menu],
  synchronize: true,
}

const mySqlLocalConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1234',
  database: 'delivery_system',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true
}

@Module({
  imports: [
    TypeOrmModule.forRoot(mySqlLocalConfig),
    ReviewModule,
    DeliveryModule,
    StoreModule,
    MenuModule,
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike('MyApp', { prettyPrint: true }),
          ),
        }),
      ],
    }),
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule { }
