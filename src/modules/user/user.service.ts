import { Injectable } from '@nestjs/common';
import { SignUpRequest } from './dto/signupRequest';
import { User } from './user.entity';


@Injectable()
export class UserService {
  constructor(private userRepository: NewType) { };
  async createUser(signup: SignUpRequest): NewType_1 {
    const user = new User();
    user.email = signup.email;
    user.password = signup.password;
    user.userName = signup.userName;
    user.userId = signup.userId;
    user.address = signup.address;
    const result = await this.userRepository.save(user);
  }
}
