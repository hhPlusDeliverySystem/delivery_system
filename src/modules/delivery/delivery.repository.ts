import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { Delivery } from "./delivery.entity";

@Injectable()
export class DeliveryRepository {
  constructor(
    @InjectRepository(Delivery) private deliveryModel: Repository<Delivery>,
  ) { }

  async findDeliveryById(deliveryId: number): Promise<Delivery> {
    const deliveryfound = await this.deliveryModel.findOne({
      where: { id: deliveryId },
    });
    return deliveryfound;
  }

  async save(delivery: Delivery): Promise<Delivery> {
    const result = await this.deliveryModel.save(delivery);
    return delivery;
  }


  async updateDeliveryDeparture(
    deliveryId: number,
    time: Date,
  ): Promise<Delivery> {
    const delivery = await this.findDeliveryById(deliveryId);
    if (delivery == null) {
      throw new BadRequestException('존재하지 않는 배달 건 입니다.')
    }
    delivery.departureTime = time;
    delivery.deliveryStatus = 'start';
    delivery.departureMessage = '배달 시작';
    delivery.departureAlimToUser = true;
    const result = await this.save(delivery);
    return result;
  }

  async updateDeliveryArrival(
    deliveryId: number,
    time: Date,
  ): Promise<Delivery> {
    const delivery = await this.findDeliveryById(deliveryId);
    if (delivery == null) {
      throw new BadRequestException('존재하지 않는 배달 건 입니다.')
    }
    delivery.arrivalTime = time;
    delivery.deliveryStatus = 'end';
    delivery.arrivalMessage = '배달 완료';
    delivery.arrivalAlimToOwner = true;
    delivery.arrivalAlimToUser = true;
    const result = await this.save(delivery);
    return result;
  }

}