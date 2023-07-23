import { MyCart } from './myCart.entity';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyCartController } from './myCart.controller';
import { MyCartService } from './myCart.service';
import { MyCartRepository } from './myCart.repository';
import { LoggerService } from 'src/utils/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([MyCart])],
  controllers: [MyCartController],
  providers: [MyCartService, MyCartRepository, Logger, LoggerService]
})
export class MyCartModule { }
