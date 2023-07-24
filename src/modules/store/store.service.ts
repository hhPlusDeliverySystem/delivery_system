import { BadRequestException, Injectable } from '@nestjs/common';
import { request } from 'express';
import { throwIfEmpty } from 'rxjs';
import { LoggerService } from 'src/utils/logger.service';
import { StoreRequest } from './dto/storeRequest';
import { Store } from './store.entity';
import { StoreRepository } from './store.repository';

@Injectable()
export class StoreService {
  constructor(
    private storeRepository: StoreRepository,
    private loggerService: LoggerService,
  ) { }

  async validateStoreRequest(store: StoreRequest): Promise<boolean> {
    const storeRegisteredByUser = await this.storeRepository.findStoreByUserId(
      store.userId,
    );

    if (storeRegisteredByUser.length > 0) {
      throw new BadRequestException('해당 아이디로 등록한 가게가 존재합니다.');
    }

    if (
      store.name == null ||
      store.address == null ||
      store.phoneNumber == null
    ) {
      throw new BadRequestException('필수 값을 입력해 주세요.');
    }

    const storeRegisteredByName = await this.storeRepository.findStoreByName(
      store.name,
    );
    if (storeRegisteredByName.length > 0) {
      throw new Error('해당 이름으로 등록된 가게가 존재합니다.');
    }

    return true;
  }

  async saveStore(store: StoreRequest): Promise<Store> {
    try {
      await this.validateStoreRequest(store);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    const newStore = new Store();
    newStore.userId = store.userId;
    newStore.name = store.name;
    newStore.address = store.address;
    newStore.phoneNumber = store.phoneNumber;
    const result = await this.storeRepository.save(newStore);
    return result;
  }
}
