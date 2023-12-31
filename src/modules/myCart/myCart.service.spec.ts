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
      menuPrice: 7000,
      deliveryPrice: 3000,
      totalPrice: 10000,
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

describe('MyCartService', () => {
  let service: MyCartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([MyCart]),
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [MyCart],
          synchronize: true,
        }),
      ],
      providers: [MyCartService, MyCartRepository],
    }).compile();

    service = module.get<MyCartService>(MyCartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
