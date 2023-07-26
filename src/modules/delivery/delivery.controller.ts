import { Controller, Inject, Param, Post, Put, UseFilters } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { SuccessResponse } from '../successResponse';
import { DeliveryService } from './delivery.service';

import { level, Logger } from 'winston';
import { AppController } from 'src/app.controller';
import { LoggerService } from 'src/utils/logger.service';
import { HttpExceptionFilter } from 'src/middleware/exception.filter';

@UseFilters(HttpExceptionFilter)
@Controller('delivery')
export class DeliveryController {

  constructor(
    private deliveryService: DeliveryService,
    private readonly logger: Logger,
    private readonly loggerService: LoggerService,
  ) { }


  @Put('/:deliveryId/start')
  @ApiOperation({
    summary: '배달 시작 api',
    description: '배달 시작으로 상태 변경',
  })
  @ApiCreatedResponse({ description: '배달 시작', type: SuccessResponse })
  async createDelivery(
    @Param('deliveryId') deliveryId: number,
  ): Promise<SuccessResponse> {
    this.loggerService.log('delivery start');
    await this.deliveryService.updateDeliveryStart(deliveryId, new Date());
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
    this.loggerService.log('delivery end');
    await this.deliveryService.updateDeliveryEnd(deliveryId, new Date());
    return new SuccessResponse(1000, '배달이 종료되었습니다.');
  }
}
