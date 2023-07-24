import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrderService } from '../service/orders.service';
import { CreateOrderDto } from '../dto/createOder.dto';
import { UpdateOrderDto } from '../dto/updateOrder.dto';
import { LoggerService } from 'src/utils/logger.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly loggerService: LoggerService) { }

  @Post('')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    this.loggerService.log('createOrder')
    const response = await this.orderService.createOrder(createOrderDto);
    return response;
  }

  @Patch()
  async updateOrder(orderId: number, @Body() UpdateOrderDto: UpdateOrderDto) {
    this.loggerService.log('updateOrder')
    const response = await this.orderService.updateOrder(
      orderId,
      UpdateOrderDto,
    );
    return response;
  }

  @Delete()
  async deleteOrder(orderId: number) {
    this.loggerService.log('deleteOrder')
    const response = await this.orderService.deleteOrder(orderId);
  }
}
