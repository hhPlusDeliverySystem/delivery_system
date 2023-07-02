import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from '../delivery/delivery.entity';
import { DeliveryRepository } from '../delivery/delivery.repository';
import { Review } from './review.entity';
import { ReviewRepository } from './review.repository';
import { ReviewService } from './review.service';

const now = new Date();

const mockData = {
  reviews: [
    { id: 1, content: 'this is review test1.', deliveryId: 1, userId: 1 },
    { id: 2, content: 'this is review test2.', deliveryId: 2, userId: 2 },
  ],
  review: {
    id: 1,
    content: 'this is review test',
    deliveryId: 1,
    userId: 1,
  },
  deliveryEnd: {
    id: 1,
    orderId: 1,
    departureTime: new Date(now.getTime() - 1800000),
    arrivalTime: null,
    deliveryStatus: 'start',
    departureMessage: '배달 시작',
    arrivalMessage: '배달 완료',
    departureAlimToUser: true,
    arrivalAlimToUser: true,
    arrivalAlimToOwner: true
  },
  deliveryEnd1hour: {
    id: 1,
    orderId: 1,
    departureTime: new Date(now.getTime() - 3600000),
    arrivalTime: new Date(now.getTime() - 1800000),
    deliveryStatus: 'start',
    departureMessage: '배달 시작',
    arrivalMessage: '배달 완료',
    departureAlimToUser: true,
    arrivalAlimToUser: true,
    arrivalAlimToOwner: true
  },
  deliveryEnd24hour: {
    id: 1,
    orderId: 1,
    departureTime: new Date(now.getTime() - 25 * 3600000),
    arrivalTime: new Date(now.getTime() - 24.5 * 3600000),
    deliveryStatus: 'start',
    departureMessage: '배달 시작',
    arrivalMessage: '배달 완료',
    departureAlimToUser: true,
    arrivalAlimToUser: true,
    arrivalAlimToOwner: true
  },
};

describe('ReviewService', () => {
  let reviewService: ReviewService;
  let deliveryRepository: DeliveryRepository;
  let reviewRepository: ReviewRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([Review, Delivery]),
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Review, Delivery],
          synchronize: true,
        }),
      ],
      providers: [ReviewRepository, ReviewService, DeliveryRepository],
    }).compile();
    reviewService = module.get<ReviewService>(ReviewService);
    deliveryRepository = module.get<DeliveryRepository>(DeliveryRepository);
    reviewRepository = module.get<ReviewRepository>(ReviewRepository);
  });

  describe('findReview', () => {
    const reviewId = 1;
    it('존재하는 아이디를 리턴하는지 확인', async () => {
      jest
        .spyOn(reviewRepository, 'findOneReview')
        .mockResolvedValue(mockData.review);
      const result = await reviewService.findOneById(reviewId);
      expect(result.id).toBe(reviewId);
    });
  });

  describe('createReview', () => {
    const deliveryId = 1;
    const userId = 1;
    const content = 'test review';

    it('이미 리뷰를 작성하였는지 확인', async () => {
      jest
        .spyOn(reviewRepository, 'findReviewByDeliveryId')
        .mockResolvedValue(mockData.reviews);
      await expect(
        reviewService.createReview(deliveryId, userId, content),
      ).rejects.toThrowError(
        new BadRequestException('이미 리뷰가 작성되었습니다.'),
      );
    })
    it('배달 도착 시간이 없음', async () => {
      jest
        .spyOn(deliveryRepository, 'findDeliveryById')
        .mockResolvedValue(mockData.deliveryEnd);
      await expect(
        reviewService.createReview(deliveryId, userId, content),
      ).rejects.toThrowError(
        new BadRequestException('배달이 도착하지 않았습니다.'),
      );
    });

    it('1시간 이전에 리뷰 작성', async () => {
      jest
        .spyOn(deliveryRepository, 'findDeliveryById')
        .mockResolvedValue(mockData.deliveryEnd1hour);

      await expect(
        reviewService.createReview(deliveryId, userId, content),
      ).rejects.toThrowError(
        new BadRequestException('배달 도착 후 1시간이 지나지 않았습니다.'),
      );
    });

    it('24 시간 이후 리뷰작성', async () => {
      jest
        .spyOn(deliveryRepository, 'findDeliveryById')
        .mockResolvedValue(mockData.deliveryEnd24hour);

      await expect(
        reviewService.createReview(deliveryId, userId, content),
      ).rejects.toThrowError(
        new BadRequestException('배달 도착 후 24시간이 지났습니다.'),
      );
    });

    it('존재하지 않는 배달 건', async () => {
      jest
        .spyOn(deliveryRepository, 'findDeliveryById')
        .mockResolvedValue(null);
      await expect(
        reviewService.createReview(deliveryId, userId, content),
      ).rejects.toThrowError(
        new BadRequestException('존재하지 않는 배달건입니다.'),
      );
    });
  });

});
