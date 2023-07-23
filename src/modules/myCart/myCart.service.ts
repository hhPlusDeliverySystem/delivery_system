import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { MyCartRepository } from './myCart.repository';

@Injectable()
export class MyCartService {
  constructor(private MyCartRepository: MyCartRepository) { }

  async getMyCart(id: number, cartId: string) {
    return cartId;
  }

  async createMyCartWithException(cartId: string) {
    throw new BadRequestException('Not implemented');
    return cartId;
  }

  async createMyCart(
    id: number,
    orderId: string,
    storeName: string,
    menuName: string,
    unitCount: number,
    menuPrice: number,
    deliveryPrice: number,
    totalPrice: number,
  ) {
    return id;
  }

  async putMyCart(
    id: number,
    orderId: string,
    storeName: string,
    menuName: string,
    unitCount: number,
    menuPrice: number,
    deliveryPrice: number,
    totalPrice: number,
  ) {
    return id;
  }

  async dlelteMyCart(
    id: number,
    orderId: string,
    storeName: string,
    menuName: string,
    unitCount: number,
    menuPrice: number,
    deliveryPrice: number,
    totalPrice: number,
  ) {
    return id;
  }
}
