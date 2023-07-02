import { Controller, Param, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { SuccessResponse } from '../successResponse';
import { DeliveryService } from './delivery.service';

@Controller('delivery')
export class DeliveryController {
  constructor(private deliveryService: DeliveryService) {}

  @Put('/:deliveryId/start')
  @ApiOperation({
    summary: '배달 시작 api',
    description: '배달 시작으로 상태 변경',
  })
  @ApiCreatedResponse({ description: '배달 시작', type: SuccessResponse })
  async createDelivery(
    @Param('deliveryId') deliveryId: number,
  ): Promise<SuccessResponse> {
    // await this.deliveryService.updateDeliveryStart(deliveryId, new Date());
    return new SuccessResponse(1000, '배달이 시작되었습니다.');
  }

  @Put('/:deliveryId/end')
  @ApiOperation({
    summary: '배달 완료 api',
    description: '배달 완료로 상태 변경',
  })
  @ApiCreatedResponse({ description: '배달 완료', type: SuccessResponse })
  async endDelivery(
    @Param('deliveryId') deliveryId: number,
  ): Promise<SuccessResponse> {
    // await this.deliveryService.updateDeliveryEnd(deliveryId, new Date());
    return new SuccessResponse(1000, '배달이 종료되었습니다.');
  }
}
