import { BadRequestException, Injectable } from "@nestjs/common";
import { Review } from "./review.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ReviewRepository } from "./review.repository";
import { DeliveryRepository } from "../delivery/delivery.repository";

@Injectable()
export class ReviewService {
  constructor(
    private reviewRepository: ReviewRepository,
    private deliveryRepository: DeliveryRepository,
  ) { }


  async findOneById(id: number): Promise<Review> {
    const review = await this.reviewRepository.findOneReview(id);
    return review;
  }

  async createReview(deliveryId: number, userId: number, content: string) {
    const resultCode = 1000;
    const now = new Date();
    const delivery = await this.deliveryRepository.findDeliveryById(deliveryId);

    const reviews = await this.reviewRepository.findReviewByDeliveryId(
      deliveryId)

    if (reviews.length > 0) {
      throw new BadRequestException('이미 리뷰가 작성되었습니다.');
    }

    if (delivery == null) {
      throw new BadRequestException('존재하지 않는 배달건입니다.');
    }

    const arrivalTime = delivery.arrivalTime;
    if (arrivalTime == null) {
      throw new BadRequestException('배달이 도착하지 않았습니다.');
    }
    const timeGapInMillis = Math.abs(now.getTime() - arrivalTime.getTime());
    const timeGapInMinutes = Math.floor(timeGapInMillis / (1000 * 60));
    if (timeGapInMinutes > 60 * 24) {
      throw new BadRequestException('배달 도착 후 24시간이 지났습니다.');
    }

    if (timeGapInMinutes < 60 * 1) {
      throw new BadRequestException('배달 도착 후 1시간이 지나지 않았습니다.');
    }

  }

}