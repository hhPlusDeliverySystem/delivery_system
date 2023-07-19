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
import { ConfigModule } from '@nestjs/config';

const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: ':memory:',
  entities: [Review, Delivery, Store, Menu],
  synchronize: true,
}

const mySqlLocalConfig: MysqlConnectionOptions = {
    type: 'mysql',
    host: process.env.RDS_HOST,
    port: 3306,
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PW,
    database: 'delivery_system',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true
}

@Module({
  imports: [
    TypeOrmModule.forRoot(mySqlLocalConfig),
    ConfigModule.forRoot({
      
    }),
    ReviewModule,
    DeliveryModule,
    StoreModule,
    MenuModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule { }
