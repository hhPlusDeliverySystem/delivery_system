/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from "@nestjs/common";
import { StoreRepository } from "../store/store.repository";
import { MenuRequest } from "./dto/menuRequest";
import { MenuRepository } from "./menu.repository";
import { Menu } from "./menu.entity";

@Injectable()
export class MenuService {
  constructor(
    private menuRepository: MenuRepository,
    private storeRepository: StoreRepository,
  ) {}

  async validateMenuRequest(menuRequest: MenuRequest): Promise<boolean> {
    const store = await this.storeRepository.findStoreById(menuRequest.storeId);
    if (store == null) {
      throw new BadRequestException('등록되지 않은 가게 입니다.');
    }
   
    if (store != null && store.userId != menuRequest.userId) {
      throw new BadRequestException('자신의 매장이 아닙니다.');
    }

    const menu = await this.menuRepository.findMenuByStoreId(
      menuRequest.storeId
    );
    if (menu.length > 100) {
      throw new BadRequestException('메뉴는 100개까지 등록 가능합니다');
    }

    const menuFindByName =
      await this.menuRepository.findMenuByStoreIdAndMenuName(
        menuRequest.storeId,
        menuRequest.name,
      );

    if (menuFindByName != null) {
      throw new BadRequestException('해당 이름으로 등록된 메뉴가 존재합니다.');
    }

    if (menuRequest.name == null || menuRequest.price == null) {
      throw new BadRequestException('필수 값을 입력해 주세요.');
    }

    return true;

  }

  async saveMenu(menuRequest: MenuRequest): Promise<Menu> {
    if(this.validateMenuRequest(menuRequest)) {
      const newMenu = new Menu();
      newMenu.storeId = menuRequest.storeId;
      newMenu.name = menuRequest.name;
      newMenu.price = menuRequest.price;
      const result = await this.menuRepository.save(newMenu);
      return result;
    }
  }

}