import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Menu } from "./menu.entity";


@Injectable()
export class MenuRepository {
  constructor(@InjectRepository(Menu) private menuModel: Repository<Menu>) { }

  async findMenuByStoreId(storeId: number): Promise<Menu[]> {
    const menuFound = await this.menuModel.find({
      where: { storeId: storeId },
    });
    return menuFound;
  }

  async findMenuByStoreIdAndMenuName(
    storeId: number,
    menuName: string,
  ): Promise<Menu> {
    const menuFound = await this.menuModel.findOne({
      where: { storeId: storeId, name: menuName },
    });
    return menuFound;
  }

  async save(menu: Menu): Promise<Menu> {
    const result = await this.menuModel.save(menu);
    return result;
  }

}