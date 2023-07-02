import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { OrderService } from '../service/orders.service';
import { CreateOrderDto } from '../dto/createOder.dto';

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

    @Get(':orderId')
    getOrderById(@Param('orderId') id: number) {
    const response = this.orderService.getOrderById(id);
  return response;
  } 






}
