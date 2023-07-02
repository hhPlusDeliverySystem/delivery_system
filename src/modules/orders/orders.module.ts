import { Module } from '@nestjs/common';
import { OrderController } from '../orders/controllers/orders.controller';
import { OrderService } from './service/orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { order } from './order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([order])],
  controllers: [OrderController],
  providers: [
    {
      provide: "ORDERS_SERVICES",
      useClass: OrderService,
    }
  ]

})
export class OrdersModule {}
