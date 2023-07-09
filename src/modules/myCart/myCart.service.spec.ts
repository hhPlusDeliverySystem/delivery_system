import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyCart } from './myCart.entity';
import { MyCartRepository } from './myCart.repository';
import { MyCartService } from './myCart.service';

const mockData = {
  myCart11Items: [
    {
      id: 1,
      orderId: '1',
      storeName: '스타벅스',
      menuName: '아이스아메리카노',
      unitCount: 2,
      menuPrice: 9000,
      deliveryPrice: 3000,
      totalPrice: 12000,
      userId: 1
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
      userId: 1
    }, {
      id: 1,
      orderId: '1',
      storeName: '스타벅스',
      menuName: '아이스아메리카노',
      unitCount: 2,
      menuPrice: 9000,
      deliveryPrice: 3000,
      totalPrice: 12000,
      userId: 1
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
      userId: 1
    }, {
      id: 1,
      orderId: '1',
      storeName: '스타벅스',
      menuName: '아이스아메리카노',
      unitCount: 2,
      menuPrice: 9000,
      deliveryPrice: 3000,
      totalPrice: 12000,
      userId: 1
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
      userId: 1
    }, {
      id: 1,
      orderId: '1',
      storeName: '스타벅스',
      menuName: '아이스아메리카노',
      unitCount: 2,
      menuPrice: 9000,
      deliveryPrice: 3000,
      totalPrice: 12000,
      userId: 1
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
      userId: 1
    }, {
      id: 1,
      orderId: '1',
      storeName: '스타벅스',
      menuName: '아이스아메리카노',
      unitCount: 2,
      menuPrice: 9000,
      deliveryPrice: 3000,
      totalPrice: 12000,
      userId: 1
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
      userId: 1
    }, {
      id: 2,
      orderId: '2',
      storeName: '메가커피',
      menuName: '아이스라떼',
      unitCount: 2,
      menuPrice: 7000,
      deliveryPrice: 3000,
      totalPrice: 10000,
      userId: 1
    }
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
    userId: 1
  },
};

describe('ReviewService', () => {
  let myCartService: MyCartService;
  let myCartRepository: MyCartRepository;
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
    myCartService = module.get<MyCartService>(MyCartService);
    myCartRepository = module.get<MyCartRepository>(MyCartRepository);
  });

  describe('getMycartList', () => {
    const userId = 1;
    it('장바구니의 최대 메뉴 개수 초과', async () => {
      // mockDate의 mycart11Items를 반환하도록 설정했습니다. 
      // 이 경우 메뉴를 10개 초과했기에 에러가 발생합니다.
      jest
        .spyOn(myCartRepository, 'findMyCartByUserId')
        .mockResolvedValue(mockData.myCart11Items);
      await expect(myCartService.getMyCartList(userId)).rejects.toThrowError(
        new BadRequestException('장바구니에 메뉴가 10개를 초과합니다.'),
      );
    })

    it('장바구니의 메뉴 없음', async () => {
      // userId로 장바구니 조회시 null을 리턴하도록 설정했습니다. 
      jest
        .spyOn(myCartRepository, 'findMyCartByUserId')
        .mockResolvedValue(null);
      // 장바구니가 비었기 때문에 에러를 리턴합니다. 
      await expect(myCartService.getMyCartList(userId)).rejects.toThrowError(
        new BadRequestException('장바구니가 비어있습니다.'),
      );
    })
  })
})