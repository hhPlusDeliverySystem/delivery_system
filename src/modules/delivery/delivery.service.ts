import { BadRequestException, Injectable } from '@nestjs/common';
import { Delivery } from './delivery.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryRepository } from './delivery.repository';
import { LoggerService } from 'src/utils/logger.service';

@Injectable()
export class DeliveryService {
  constructor(
    private deliveryRepository: DeliveryRepository,
    private loggerService: LoggerService) { }

  async sendDeliveryAlim(id: number, message: string) {
    return message;
  }

  async updateDeliveryStart(id: number, time: Date) {
    const updated = await this.deliveryRepository.updateDeliveryDeparture(
      id,
      time,
    );
    if (updated.departureTime == null) {
      throw new BadRequestException('배달 시작 시간 업데이트에 실패했습니다.');
    }
    if (updated.deliveryStatus != 'start') {
      throw new BadRequestException('올바르지 않은 배달 상태입니다.');
    }
    if (updated.departureMessage != '배달 시작') {
      throw new BadRequestException('잘못된 알림이 전송되었습니다.');
    }
    if (
      updated.departureAlimToUser == null ||
      updated.departureAlimToUser == false
    ) {
      throw new BadRequestException('유저 알림 전송에 실패했습니다.');
    }
  }

  async updateDeliveryEnd(id: number, time: Date) {
    const updated = await this.deliveryRepository.updateDeliveryArrival(
      id,
      time,
    );
    if (updated.arrivalTime == null) {
      throw new BadRequestException(
        '배달 완료 시간이 업데이트 되지 않았습니다.',
      );
    }
    if (updated.deliveryStatus != 'end') {
      throw new BadRequestException('올바르지 않은 배달 상태 입니다.');
    }
    if (updated.arrivalMessage != '배달 완료') {
      throw new BadRequestException('잘못된 알림이 전송되었습니다.');
    }

    if (
      updated.arrivalAlimToUser == null ||
      updated.arrivalAlimToUser == false
    ) {
      throw new BadRequestException('유저에게 알림이 전송되지 않았습니다.');
    }

    if (
      updated.arrivalAlimToOwner == null ||
      updated.arrivalAlimToOwner == false
    ) {
      throw new BadRequestException('사장님에게 알림이 전송되지 않았습니다.');
    }
  }
}
