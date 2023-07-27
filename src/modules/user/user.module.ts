import { Logger, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoggerService } from "src/utils/logger.service";
import { StoreRepository } from "../store/store.repository";
import { StoreService } from "../store/store.service";
import { UserController } from "./user.controller";
import { User } from "./user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [StoreService, StoreRepository, Logger, LoggerService],
  exports: [StoreRepository]
})

export class UserModule { }