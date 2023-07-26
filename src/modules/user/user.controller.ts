import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { LoggerService } from 'src/utils/logger.service';
import { SuccessResponse } from '../successResponse';
import { SignUpRequest } from './dto/signupRequest';
import { UserService } from './user.service';

interface User {
  id: string;
  email: string;
}

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly loggerService: LoggerService) { }

  // @Post('/signup')
  // @ApiOperation({
  //   summary: '회원가입 api',
  //   description: '회원가입'
  // })
  // @ApiCreatedResponse({ description: '회원가입', type: SuccessResponse })
  // signUpUser(@Body() request: SignUpRequest): SuccessResponse {
  //   this.loggerService.log('signUpUser');
  //   this.userService.createUser(request);
  //   return new SuccessResponse(1000, "회원가입 성공");
  // }
}