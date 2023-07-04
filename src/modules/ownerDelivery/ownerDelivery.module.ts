import { OwnerDelivery } from './ownerDelivery.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerDeliveryRepository } from './ownerDelivery.repository';
import { OwnerDeliveryController } from './ownerDelivery.controller';
import { OwnerDeliveryService } from './ownerDelivery.service';

@Module({
  imports: [TypeOrmModule.forFeature([OwnerDelivery])],
  controllers: [OwnerDeliveryController],
  providers: [OwnerDeliveryService, OwnerDeliveryRepository],
  exports: [OwnerDeliveryRepository],
})
export class OwnDeliveryModule {}
