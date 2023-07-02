import { DeliveryStatus } from "../deliveryStatus";
import { Delivery } from "../delivery.entity";

export class DeliveryDto {
  id: number;
  orderId: number;
  startTime: Date;
  endTime: Date;
  deliveryStatus: DeliveryStatus;

  // constructor(delivery: Delivery) {
  //   this.id = delivery.id;
  //   this.orderId = delivery.orderId;
  //   this.startTime = delivery.startTime;
  //   this.endTime = delivery.endTime;
  //   this.deliveryStatus = delivery.deliveryStatus;
  // }
}