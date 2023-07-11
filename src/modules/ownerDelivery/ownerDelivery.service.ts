import { BadRequestException, Injectable } from '@nestjs/common';
import { OwnerDelivery } from './ownerDelivery.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnerDeliveryRepository } from './ownerDelivery.repository';

@Injectable()
export class OwnerDeliveryService {
  constructor(private OwnerDeliveryRepository: OwnerDeliveryRepository) {}
}
