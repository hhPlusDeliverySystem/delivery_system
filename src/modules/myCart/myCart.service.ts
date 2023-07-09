import { BadRequestException, Injectable } from '@nestjs/common';
import { MyCart } from './myCart.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MyCartRepository } from './myCart.repository';

@Injectable()
export class MyCartService {
  constructor(private MyCartRepository: MyCartRepository) { }


  // 유저의 id로 장바구니를 조회하는 코드 입니다. 
  // 장바구니가 빈 리스트 일 경우 에러를 리턴합니다. 
  async getMyCartList(userId: number) {
    const myCartList = await this.MyCartRepository.findMyCartByUserId(userId);
    // 실패 시나리오 : 장바구니에 메뉴 조회가 되지 않는다
    if (myCartList == null) {
      throw new BadRequestException('장바구니가 비어있습니다.');
    }

    // 실패 시나리오: 장바구니에 다른 메뉴가 조회된다.
    // 이 부분은 정확히 어떤 케이스인지 모르겠어서 10개를 초과하는 경우로 바꾸었습니다.

    if (myCartList.length > 10) {
      throw new BadRequestException('장바구니에 메뉴가 10개를 초과합니다.');
    }
    return userId;
  }

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
