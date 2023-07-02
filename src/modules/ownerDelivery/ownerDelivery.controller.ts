import { Controller, Put, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { SuccessResponse } from '../successResponse';
import { OwnerDeliveryService } from './ownerDelivery.service';

@Controller('ownerDelivery')
export class OwnerDeliveryController {
  constructor(private readonly ownerDeliveryController: OwnerDeliveryService) {}

  @Put('/ownerDelivery/status')
  @ApiOperation({
    summary: '주문 승낙/ 거절 api',
    description: '주문에 대해서 승낙/ 거절 처리',
  })
  @ApiCreatedResponse({ description: '주문 승낙/ 거절', type: SuccessResponse })
  async changeOwnerDeliveryStatus(
    @Param('statusId') statusId: string,
  ): Promise<SuccessResponse> {
    return new SuccessResponse(100, '주문 상태가 수정되었습니다.');
  }
}
