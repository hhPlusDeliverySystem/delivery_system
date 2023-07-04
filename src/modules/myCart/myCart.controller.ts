import { Controller, Post, Get, Put, Delete, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { SuccessResponse } from '../successResponse';
import { MyCartService } from './myCart.service';

@Controller('myCart')
export class MyCartController {
  constructor(private readonly myCartController: MyCartService) {}

  @Post('/mycart')
  @ApiOperation({
    summary: '장바구니 생성 api',
    description: '장바구니가 없는 회원의 경우 장바구니 생성',
  })
  @ApiCreatedResponse({ description: '장바구니 생성', type: SuccessResponse })
  async createMyCart(
    @Param('cartId') cartId: string,
  ): Promise<SuccessResponse> {
    return new SuccessResponse(100, '장바구니가 생성되었습니다.');
  }

  @Get('/mycart')
  @ApiOperation({
    summary: '장바구니 조회 api',
    description: '장바구니가 있는 회원의 경우 장바구니 조회',
  })
  @ApiCreatedResponse({ description: '장바구니 조회', type: SuccessResponse })
  async getMyCart(@Param('cartId') cartId: string): Promise<SuccessResponse> {
    return new SuccessResponse(100, '장바구니가 조회되었습니다.');
  }

  @Put('/mycart')
  @ApiOperation({
    summary: '장바구니 수정 api',
    description: '장바구니가 있는 회원의 경우 장바구니 수정',
  })
  @ApiCreatedResponse({ description: '장바구니 수정', type: SuccessResponse })
  async putMyCart(@Param('cartId') cartId: string): Promise<SuccessResponse> {
    return new SuccessResponse(100, '장바구니가 수정되었습니다.');
  }

  @Delete('/mycart')
  @ApiOperation({
    summary: '장바구니 생성 api',
    description: '장바구니가 있는 회원의 경우 장바구니 삭제',
  })
  @ApiCreatedResponse({ description: '장바구니 삭제', type: SuccessResponse })
  async deleteMyCart(
    @Param('cartId') cartId: string,
  ): Promise<SuccessResponse> {
    return new SuccessResponse(100, '장바구니가 삭제되었습니다.');
  }
}
