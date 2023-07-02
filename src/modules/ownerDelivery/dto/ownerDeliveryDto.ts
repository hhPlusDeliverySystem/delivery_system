import { OwnerDelivery } from '../ownerDelivery.entity';

export class OwnerDeliveryDto {
  id: number;
  sotreName: string;
  orderStatus: string;

  constructor(ownerDelivery: OwnerDelivery) {
    this.id = ownerDelivery.id;
    this.sotreName = ownerDelivery.storeName;
    this.orderStatus = ownerDelivery.orderStatus;
  }
}
