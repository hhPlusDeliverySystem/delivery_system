import { BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Store } from "../store/store.entity";
import { StoreRepository } from "../store/store.repository";
import { Menu } from "./menu.entity";
import { MenuRepository } from "./menu.repository";
import { MenuService } from "./menu.service";


const mockData = {
  store:  {
    id: 1,
    userId: 1,
    name: 'testStore',
    phoneNumber: '010-1234-5678',
    address: '서울시 강남구 역삼동',
  },
  wrongUserStore : {
    id: 2,
    userId: 2,
    name: 'wrong user store',
    phoneNumber: '010-1234-5678',
    address: '서울시 강남구 역삼동'
  },
  menuRequest: {
    storeId: 1,
    name: '돈까스',
    price: 8000,
    userId: 1
  },
  wrongMenuRequest: {
    storeId: 1,
    name: null,
    price: null,
    userId: 1
  },
  menus: [
    {
      id: 1,
      storeId: 1,
      name: '라면',
      price: 5000,
    },
    {
      id: 2,
      storeId: 1,
      name: '김밥',
      price: 3000,
    }
  ],
  menu: 
    {
    id: 3,
      storeId: 1,
      name: '순대',
      price: 5000,
    }
  


}


describe('MenuService', () => {
  let menuService: MenuService;
  let menuRepository: MenuRepository;
  let storeRepository: StoreRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([Menu, Store]),
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Menu, Store],
          synchronize: true,
        }),
      ],
      providers: [MenuService, MenuRepository, StoreRepository],
    }).compile();
    menuService = module.get<MenuService>(MenuService);
    menuRepository = module.get<MenuRepository>(MenuRepository);
    storeRepository = module.get<StoreRepository>(StoreRepository);
  });

  describe('validateMenuRequest', () => {
    it('등록된 가게 인지 확인', async () => {
      jest.spyOn(storeRepository, 'findStoreById').mockResolvedValue(null);
      await expect(
        menuService.validateMenuRequest(mockData.menuRequest),
      ).rejects.toThrowError(
        new BadRequestException('등록되지 않은 가게 입니다.'),
      );
    })

    it('자신의 가게 인지 확인', async () => {
      jest
        .spyOn(storeRepository, 'findStoreById')
        .mockResolvedValue(mockData.wrongUserStore);
      await expect(
        menuService.validateMenuRequest(mockData.menuRequest),
      ).rejects.toThrowError(
        new BadRequestException('자신의 매장이 아닙니다.'),
      );
    })

    it('메뉴 중복 등록 확인', async () => {
      jest
        .spyOn(storeRepository, 'findStoreById')
        .mockResolvedValue(mockData.store);
      jest
        .spyOn(menuRepository, 'findMenuByStoreIdAndMenuName')
        .mockResolvedValue(mockData.menu);
      await expect(
        menuService.validateMenuRequest(mockData.menuRequest),
      ).rejects.toThrowError(
        new BadRequestException('해당 이름으로 등록된 메뉴가 존재합니다.'),
      );
    })

    it('필수 값 입력 확인', async() => {
      jest
        .spyOn(storeRepository, 'findStoreById')
        .mockResolvedValue(mockData.store);
      jest
        .spyOn(menuRepository, 'findMenuByStoreIdAndMenuName')
        .mockResolvedValue(null);
      await expect(
        menuService.validateMenuRequest(mockData.wrongMenuRequest),
      ).rejects.toThrowError(
        new BadRequestException('필수 값을 입력해 주세요.'),
      );
    })
  });

});