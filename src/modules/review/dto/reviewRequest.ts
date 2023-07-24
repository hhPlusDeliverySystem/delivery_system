import { Review } from '../review.entity';

export class ReviewRequest {
  content: string;
  deliveryId: number;
  userId: number;

}