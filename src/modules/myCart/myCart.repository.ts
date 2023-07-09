import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MyCart } from './myCart.entity';

@Injectable()
export class MyCartRepository {
  constructor(
    @InjectRepository(MyCart) private myCartModel: Repository<MyCart>,
  ) { }

  // user id로 mycart 가 몇개나 생성되었는지 확인하기 위한 조회 함수 입니다. 
  // userId를 my cart에 추가했기 때문에 userId로 조회가 가능합니다. 
  async findMyCartByUserId(userId: number): Promise<MyCart[]> {
    const result = await this.myCartModel.find({ where: { userId } });
    return result;
  }

}
