import { Injectable } from '@nestjs/common';
import { MyCartRepository } from './myCart.repository';

@Injectable()
export class MyCartService {
  constructor(private MyCartRepository: MyCartRepository) {}

  async getMyCart(id: number, cartId: string) {
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
