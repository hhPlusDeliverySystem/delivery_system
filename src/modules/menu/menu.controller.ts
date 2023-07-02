import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { SuccessResponse } from "../successResponse";
import { MenuRequest } from "./dto/menuRequest";
import { MenuService } from "./menu.service";

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Post('')
  @ApiOperation({ summary: '메뉴 등록 api', description: '메뉴 등록' })
  async createMenu(@Body() request: MenuRequest): Promise<SuccessResponse> {
    // const request: MenuRequest = new MenuRequest(
    //   body.storeId,
    //   body.name,
    //   body.price,
    //   body.userId,
    // );
    // await this.menuService.saveMenu(request);
    return new SuccessResponse(1000, '메뉴가 등록되었습니다.');
  }

}