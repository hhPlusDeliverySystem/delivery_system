import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { User } from "./user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [StoreService, StoreRepository, Logger, LoggerService],
  exports: [StoreRepository]
})

export class UserModule { }