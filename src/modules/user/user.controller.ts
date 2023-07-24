import { Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { LoggerService } from 'src/utils/logger.service';
import { SuccessResponse } from '../successResponse';
import { UserService } from './user.service';

interface User {
  id: string;
  email: string;
}

@Controller('user')
export class UserController {
  constructor(
    private readonly userController: UserService,
    private readonly loggerService: LoggerService) { }

  @Post('/signup')
  @ApiOperation({
    summary: '회원가입 api',
    description: '회원가입'
  })
  @ApiCreatedResponse({ description: '회원가입', type: SuccessResponse })
  signUpUser(@Body() request: SignUpRequest): string {
    this.loggerService.log('signUpUser');
    this.userSe
    return new SuccessResponse('1000', '회원가입이 완료되었습니다.');
  }
}
