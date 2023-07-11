import { MyCart } from './myCart.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyCartController } from './myCart.controller';
import { MyCartService } from './myCart.service';
import { MyCartRepository } from './myCart.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MyCart])],
  controllers: [MyCartController],
  providers: [MyCartService, MyCartRepository]
})
export class MyCartModule {}
