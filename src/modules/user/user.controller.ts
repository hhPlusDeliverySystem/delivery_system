import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

interface User {
  id: string;
  email: string;
}

@Controller()
export class UserController {
  constructor(private readonly userController: UserService) {}

  @Get()
  getHello(): string {
    return this.userController.getHello();
  }
}

function getOwnerSignin(): User {
  const newUser: User = {
    id: 'jason11',
    email: 'jason@gmail.com',
  };

  return newUser;
}
export { getOwnerSignin };
