import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from "./review.entity";
import { Repository } from 'typeorm';
import { ReviewDto } from "./dto/reviewDto";
import { Delivery } from "../delivery/delivery.entity";

@Injectable()
export class ReviewRepository {
  constructor(@InjectRepository(Review) private review: Repository<Review>) { }

  async findOneReview(reviewId: number): Promise<Review> {
    const review = await this.review.findOne({ where: { id: reviewId } });
    return review;
    // return new ReviewDto(review);
  }

  async createReview(content: string, deliveryId: number, userId: number) {
    // const newReview = this.review.create();
    const newReview = new Review();
    newReview.content = content;
    newReview.deliveryId = deliveryId;
    newReview.userId = userId;
    return newReview;
  }

  async findReviewByDeliveryId(deliveryId: number): Promise<Review[]> {
    const result = await this.review.find({ where: { deliveryId } });
    return result;
  }
}
