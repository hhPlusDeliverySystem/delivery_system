import { Review } from '../review.entity';

export class ReviewRequest {
    id: number;
  content: string;
    deliveryId: number;
    userId: number;

}