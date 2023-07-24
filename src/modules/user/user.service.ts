import { Injectable } from '@nestjs/common';
import { SignUpRequest } from './dto/signupRequest';
import { User } from './user.entity';
import { UserRepository } from './user.repository';


@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) { };
  async createUser(signup: SignUpRequest): Promise<User> {
    const user = new User();
    user.email = signup.email;
    user.password = signup.password;
    user.userName = signup.userName;
    user.userId = signup.userId;
    user.address = signup.address;
    const result = await this.userRepository.save(user);
  }
}
