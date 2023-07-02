import { ApiProperty } from "@nestjs/swagger";

export class StoreRequest {
  @ApiProperty({ description: '유저 아이디' })
  userId: number;
  @ApiProperty({ description: '매장 이름' })
  name: string;
  @ApiProperty({ description: '전화번호' })
  phoneNumber: string;
  @ApiProperty({ description: '주소' })
  address: string;
  constructor(
    userId: number,
    name: string,
    phoneNumber: string,
    address: string,
  ) {
    this.userId = userId;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.address = address;
  }
}