import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { OrderService } from '../service/orders.service';
import { CreateOrderDto } from '../dto/createOder.dto';
import { UpdateOrderDto } from '../dto/updateOrder.dto';

@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService
      ) {}
    
    
    @Post('create')
   async createOrder(@Body() createOrderDto: CreateOrderDto ){
        const response = await this.orderService.createOrder(createOrderDto);  
        return response;
    }

    
    @Patch()
    async updateOrder(orderId:number,@Body() UpdateOrderDto: UpdateOrderDto){
      const response = await this.orderService.updateOrder(orderId,UpdateOrderDto);
      return response;
    }


    @Delete()
    async deleteOrder(orderId:number){
      const response = await this.orderService.deleteOrder(orderId);
    }
}
