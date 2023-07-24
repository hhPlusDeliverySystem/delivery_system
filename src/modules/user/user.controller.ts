import { Controller, Get, Post } from '@nestjs/common';
import { LoggerService } from 'src/utils/logger.service';
import { UserService } from './user.service';

interface User {
  id: string;
  email: string;
}

@Controller()
export class UserController {
  constructor(
    private readonly userController: UserService,
    private readonly loggerService: LoggerService) { }

  @Post()
  getHello(): string {
    return this.userController.getHello();
  }
}
