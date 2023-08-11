import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoggerService } from "src/utils/logger.service";
import { Logger } from "winston";
import { Menu } from "../menu/menu.entity";
import { StoreController } from "./store.controller";
import { Store } from "./store.entity";
import { StoreRepository } from "./store.repository";
import { StoreService } from "./store.service";

@Module({
  imports: [TypeOrmModule.forFeature([Store, Menu])],
  controllers: [StoreController],
  providers: [StoreService, StoreRepository, Logger, LoggerService],
  exports: [StoreRepository]
})

export class StoreModule { }