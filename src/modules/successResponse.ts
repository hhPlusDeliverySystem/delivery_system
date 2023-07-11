import { ApiProperty } from '@nestjs/swagger';
import { DESTRUCTION } from 'dns';
import { ServerDescription } from 'typeorm';

export class SuccessResponse {
  @ApiProperty({ description: '응답 코드' })
  code: number;
  @ApiProperty({ description: '응답 메시지' })
  message: string;

  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }
}
