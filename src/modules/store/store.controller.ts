import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation } from "@nestjs/swagger";
import { LoggerService } from "src/utils/logger.service";
import { Logger } from "winston";
import { ReviewDto } from "../review/dto/reviewDto";
import { SuccessResponse } from "../successResponse";
import { StoreRequest } from "./dto/storeRequest";
import { StoreService } from "./store.service";

@Controller('store')
export class StoreController {
  constructor(
    private storeService: StoreService,
    private readonly logger: Logger,
    private readonly loggerService: LoggerService,
  ) { }
  @Post('')
  @ApiOperation({
    summary: '매장 등록 api',
    description: '매장 등록',
  })
  @ApiCreatedResponse({ description: '매장 등록', type: SuccessResponse })
  async createStore(@Body() request: StoreRequest): Promise<SuccessResponse> {
    this.loggerService.log('store create');
    const result = this.storeService.saveStore(request);
    if ((await result).address != request.address) {
      return new SuccessResponse(1, '매장이 등록되었습니다.');
    }
  }

  @Get('')
  @ApiOperation({
    summary: '매장 등록 api',
    description: '매장 등록',
  })
  @ApiCreatedResponse({ description: '매장 등록', type: SuccessResponse })
  async getStore(): Promise<SuccessResponse> {
    this.loggerService.log('store create');
    throw new Error('test');
    return new SuccessResponse(1, '매장이 등록되었습니다.');
  }
}