import { Body, Controller, Post, UseFilters } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/middleware/exception.filter";
import { LoggerService } from "src/utils/logger.service";
import { SuccessResponse } from "../successResponse";
import { MenuRequest } from "./dto/menuRequest";
import { MenuService } from "./menu.service";
import { Logger } from 'winston';


@Controller('menu')
export class MenuController {
  constructor(
    private menuService: MenuService,
    private readonly loggerService: LoggerService,
    private readonly logger: Logger,
  ) { }

  @Post('')
  @ApiOperation({ summary: '메뉴 등록 api', description: '메뉴 등록' })
  async createMenu(@Body() request: MenuRequest): Promise<SuccessResponse> {
    this.loggerService.infoWithContext('메뉴 등록 요청', request);
    await this.menuService.saveMenu(request);
    return new SuccessResponse(1000, '메뉴가 등록되었습니다.');
  }

}