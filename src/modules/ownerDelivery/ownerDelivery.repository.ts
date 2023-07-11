import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OwnerDelivery } from './ownerDelivery.entity';

@Injectable()
export class OwnerDeliveryRepository {
  constructor(
    @InjectRepository(OwnerDelivery)
    private ownerDelivery: Repository<OwnerDelivery>,
  ) {}
}
