import { MyCart } from './myCart.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyCartRepository } from './myCart.repository';
import { MyCartController } from './myCart.controller';
import { MyCartService } from './myCart.service';

@Module({
  imports: [TypeOrmModule.forFeature([MyCart])],
  controllers: [MyCartController],
  providers: [MyCartService, MyCartRepository],
  exports: [MyCartRepository],
})
export class MyCartModule {}
