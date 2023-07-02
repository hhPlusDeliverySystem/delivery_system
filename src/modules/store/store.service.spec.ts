import { BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Store } from "./store.entity";
import { StoreRepository } from "./store.repository";
import { StoreService } from "./store.service";

const mockData = {
  stores: [
    {
      id: 1,
      userId: 1,
      name: 'testStore',
      phoneNumber: '010-1234-5678',
      address: '서울시 강남구 역삼동'
    },
    {
      id: 2,
      userId: 2,
      name: 'testStore',
      phoneNumber: '010-1234-5678',
      address: '서울시 종로구 명동'
    },
  ],

  storeRequest: {
    userId: 1,
    name: 'testStore',
    phoneNumber: '010-1234-5678',
    address: '서울시 강남구 역삼동'
  }
}


describe('StoreService', () => {
  let storeRepository: StoreRepository;
  let storeService: StoreService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([Store]),
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Store],
          synchronize: true,
        }),
      ],
      providers: [StoreRepository, StoreService],
    }).compile();
    storeService = module.get<StoreService>(StoreService);
    storeRepository = module.get<StoreRepository>(StoreRepository);
  });

  describe('validateStoreRequest', () => {
    it('사장님이 이미 등록한 가게가 존재하는지 확인', async () => {
      jest
        .spyOn(storeRepository, 'findStoreByUserId')
        .mockResolvedValue(mockData.stores);
      await expect(
        storeService.validateStoreRequest(mockData.storeRequest),
      ).rejects.toThrowError(
        new BadRequestException('해당 아이디로 등록한 가게가 존재합니다.'),
      );
    })

    it('같은 이름으로 등록된 가게가 존재하는지 확인', async () => {
      jest
        .spyOn(storeRepository, 'findStoreByName')
        .mockResolvedValue(mockData.stores);
      await expect(
        storeService.validateStoreRequest(mockData.storeRequest),
      ).rejects.toThrowError(
        new BadRequestException('해당 이름으로 등록된 가게가 존재합니다.'),
      );
    })

    it('필수값이 모두 입력되었는지 확인', async () => {
      const storeRequest = mockData.storeRequest;
      storeRequest.name = null;
      await expect(
        storeService.validateStoreRequest(mockData.storeRequest),
      ).rejects.toThrowError(
        new BadRequestException('필수 값을 입력해 주세요.'),
      );
    })
  });

});