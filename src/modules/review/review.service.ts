import { BadRequestException, Injectable } from "@nestjs/common";
import { Review } from "./review.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ReviewRepository } from "./review.repository";
import { DeliveryRepository } from "../delivery/delivery.repository";
import { ReviewDto } from "./dto/reviewDto";
import { timingSafeEqual } from "crypto";
import { ReviewRequest } from "./dto/reviewRequest";

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

  async findReviewById(id: number): Promise<ReviewDto> {
    const review = await this.findOneById(id);
    return new ReviewDto(review);
  }

  async createReview(review: ReviewRequest): Promise<Review> {
    const now = new Date();
    const deliveryId = review.deliveryId;
    const userId = review.userId;
    const content = review.content;
    try {
      await this.validateReview(deliveryId, now);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    const result = await this.reviewRepository.save(
      new Review(content, deliveryId, userId),
    );
    return result;
  }

  async validateReview(deliveryId: number, now: Date) {
    const delivery = await this.deliveryRepository.findDeliveryById(deliveryId);
    const reviews = await this.reviewRepository.findReviewByDeliveryId(
      deliveryId);

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