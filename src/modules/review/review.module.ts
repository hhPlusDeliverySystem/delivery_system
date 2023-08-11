import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoggerService } from "src/utils/logger.service";
import { Delivery } from "../delivery/delivery.entity";
import { DeliveryRepository } from "../delivery/delivery.repository";
import { ReviewController } from "./review.controller";
import { Review } from "./review.entity";
import { ReviewRepository } from "./review.repository";
import { ReviewService } from "./review.service";

@Module({
  imports: [TypeOrmModule.forFeature([Review, Delivery]),],
  controllers: [ReviewController],
  providers: [
    ReviewService,
    ReviewRepository,
    DeliveryRepository,
    LoggerService,
  ],
  exports: [ReviewRepository],
})
export class ReviewModule { };