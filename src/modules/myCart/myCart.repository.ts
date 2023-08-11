import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MyCart } from './myCart.entity';

@Injectable()
export class MyCartRepository {
  constructor(
    @InjectRepository(MyCart) private myCartModel: Repository<MyCart>,
  ) {}
}
