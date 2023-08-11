import { Review } from '../review.entity';

export class ReviewDto {
  id: number;
  content: string;
  deliveryId: number;
  userId: number;

  constructor(review: Review) {
    this.id = review.id;
    this.content = review.content;
    this.deliveryId = review.deliveryId;
    this.userId = review.userId;
  }
}
