import { ApiProperty } from "@nestjs/swagger";
import { LargeNumberLike } from "crypto";

export class MenuRequest {
  @ApiProperty({ description: '매장 아이디' })
  storeId: number;
  @ApiProperty({ description: '메뉴명' })
  name: string;
  @ApiProperty({ description: '가격' })
  price: number;
  @ApiProperty({ description: '유저 아이디' })
  userId: number;
  constructor(storeId: number, name: string, price: number, userId: number) {
    this.storeId = storeId;
    this.name = name;
    this.price = price;
    this.userId = userId;
  }
}