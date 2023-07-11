import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Delivery } from "../delivery/delivery.entity";
import { DeliveryRepository } from "../delivery/delivery.repository";
import { ReviewController } from "./review.controller";
import { Review } from "./review.entity";
import { ReviewRepository } from "./review.repository";
import { ReviewService } from "./review.service";

@Module({
  imports: [TypeOrmModule.forFeature([Review, Delivery]),],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository, DeliveryRepository],
  exports: [ReviewRepository],
})
export class ReviewModule { };