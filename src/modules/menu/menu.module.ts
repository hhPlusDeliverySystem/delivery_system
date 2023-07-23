import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HttpExceptionFilter } from "src/middleware/exception.filter";
import { LoggerService } from "src/utils/logger.service";
import { Logger } from "winston";
import { Store } from "../store/store.entity";
import { StoreRepository } from "../store/store.repository";
import { MenuController } from "./menu.controller";
import { Menu } from "./menu.entity";
import { MenuRepository } from "./menu.repository";
import { MenuService } from "./menu.service";

@Module({
  imports: [TypeOrmModule.forFeature([Menu, Store]),],
  controllers: [MenuController],
  providers: [
    MenuService,
    MenuRepository,
    StoreRepository,
    LoggerService,
    Logger,
  ],
  exports: [MenuRepository],
})

export class MenuModule { }