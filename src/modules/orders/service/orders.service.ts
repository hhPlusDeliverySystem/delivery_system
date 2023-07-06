import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { order } from '../entity/order.entity'
import { CreateOrderDto } from '../dto/createOder.dto';
import { UpdateOrderDto } from '../dto/updateOrder.dto';


@Injectable()
export class OrderService {

    constructor(
        @InjectRepository(order)
        private orderRepository: Repository<order>,
      ) {}
    
    // todo: user추가하기
    async createOrder(order: CreateOrderDto): Promise<{ status: boolean; msg?: string }>{

        try{
           const newOrder = await this.orderRepository.create(order);
            if(newOrder.quantity > 1 && newOrder.quantity <= 10){
             await this.orderRepository.save(newOrder);
             return {
                status: true,
                msg:'order was successful'
             }
             }else {
                return {
                    status: false,
                    msg:'you should order no more than 10 items'
                 }
             }
        } catch(error:any){

            throw new HttpException('Something went wrong.',HttpStatus.BAD_REQUEST);
        }
       
    }

    async findOrderById(userName: string): Promise<{ status: boolean; msg?: string; }>{
        const order = await this.orderRepository.findOne({ where: {userName : userName} });
        if(!order){
            return {
                status: false,
                msg: 'order not found'
            }
        }
    }

    async updateOrder(orderId:number, updateOrderDto:UpdateOrderDto){
        const order = this.orderRepository.findOne({where: {id:orderId}})

        const updateOrder = {
            ...order,
            ...updateOrderDto
        }

        return this.orderRepository.save(updateOrder);
    }

    async deleteOrder(orderId:number){
        return await this.orderRepository.delete(orderId);
    }

}
