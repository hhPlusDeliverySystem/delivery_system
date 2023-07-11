import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Store } from "../store/store.entity";
import { StoreRepository } from "../store/store.repository";
import { MenuController } from "./menu.controller";
import { Menu } from "./menu.entity";
import { MenuRepository } from "./menu.repository";
import { MenuService } from "./menu.service";

@Module({
  imports: [TypeOrmModule.forFeature([Menu, Store]),],
  controllers: [MenuController],
  providers: [MenuService, MenuRepository, StoreRepository],
})

export class MenuModule { }