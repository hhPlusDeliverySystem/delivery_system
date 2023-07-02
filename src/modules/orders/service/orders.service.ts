import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../../orders/dto/createOder.dto'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { order } from '../order.entity'

@Injectable()
export class OrderService {

    constructor(
        @InjectRepository(order)
        private ordersRepository: Repository<order>,
      ) {}
    

    private orders = [{
        orderId : "orderT01"
    },
    {
        orderId : "orderT02"
    }
    ]
    async createOrder(createOrderDto: CreateOrderDto) {

        const { orderId } = createOrderDto;

        const order = this.orders.find((o) => o.orderId === orderId)

        if(order && this.orders.length <= 10)
            return {
                status : 'success For createOrders',
            };
        else {
            throw new BadRequestException();
        }
    }

    async getOrderById(id: number ) {
        
        const order = await this.ordersRepository.findOneBy({id: id});

        if (order) {
          return {
            id: id,
          }
        } throw new BadRequestException();

    }
}
