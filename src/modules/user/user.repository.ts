import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Transaction } from "typeorm";
import { User } from './user.entity';


@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User) private userModel: Repository<User>) { }

  async save(user: User): Promise<User> {
    const result = await this.userModel.save(user);
    return result;
  }

  async findUserById(userId: number): Promise<User> {
    const userFound = await this.userModel.findOne({
      where: { id: userId },
    });
    return userFound;
  }

}