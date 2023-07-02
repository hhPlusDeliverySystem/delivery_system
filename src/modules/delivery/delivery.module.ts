import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Review } from "../review/review.entity";
import { ReviewRepository } from "../review/review.repository";
import { DeliveryController } from "./delivery.controller";
import { Delivery } from "./delivery.entity";
import { DeliveryRepository } from "./delivery.repository";
import { DeliveryService } from "./delivery.service";


@Module({
  imports: [TypeOrmModule.forFeature([Delivery, Review]),],
  controllers: [DeliveryController],
  providers: [DeliveryService, DeliveryRepository, ReviewRepository],
  exports: [DeliveryRepository],
})
export class DeliveryModule { };