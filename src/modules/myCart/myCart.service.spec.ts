import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyCart } from './myCart.entity';
import { MyCartRepository } from './myCart.repository';
import { MyCartService } from './myCart.service';

const mockData = {
  myCarts: [
    {
      id: 1,
      orderId: '1',
      storeName: '스타벅스',
      menuName: '아이스아메리카노',
      unitCount: 2,
      menuPrice: 9000,
      deliveryPrice: 3000,
      totalPrice: 12000,
    },
    {
      id: 2,
      orderId: '2',
      storeName: '메가커피',
      menuName: '아이스라떼',
      unitCount: 2,
      menuPrice: 6000,
      deliveryPrice: 3000,
      totalPrice: 9000,
    },
  ],
  myCart: {
    id: 1,
    orderId: '1',
    storeName: '스타벅스',
    menuName: '아이스아메리카노',
    unitCount: 2,
    menuPrice: 9000,
    deliveryPrice: 3000,
    totalPrice: 12000,
  },
};

describe('createMyCart', () => {
  let myCartService: MyCartService;
  let myCartRepository: MyCartRepository;
});
