import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Store } from "./store.entity";


@Injectable()
export class StoreRepository {
  constructor(@InjectRepository(Store) private storeModel: Repository<Store>) { }

  async findStoreById(storeId: number): Promise<Store> {
    const storeFound = await this.storeModel.findOne({
      where: { id: storeId },
    });
    return storeFound;
  }

  async findStoreByUserId(userId: number): Promise<Store[]> {
    const storeFound = await this.storeModel.find({
      where: { userId: userId },
    });
    return storeFound;
  }

  async findStoreByName(name: string): Promise<Store[]> {
    const storeFound = await this.storeModel.find({
      where: {
        name: name,
      },
    });
    return storeFound;
  }

  async save(store: Store): Promise<Store> {
    const result = await this.storeModel.save(store);
    return result;
  }

}