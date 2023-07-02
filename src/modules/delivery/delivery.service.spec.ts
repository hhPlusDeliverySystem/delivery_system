import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from './delivery.entity';
import { DeliveryRepository } from './delivery.repository';
import { DeliveryService } from './delivery.service';

const now = new Date();
const mockData = {
  deliveryStart: {
    id: 1,
    orderId: 1,
    departureTime: new Date(now.getTime() - 1800000),
    arrivalTime: null,
    deliveryStatus: 'start',
    departureMessage: '배달 시작',
    arrivalMessage: '배달 완료',
    departureAlimToUser: false,
    arrivalAlimToUser: false,
    arrivalAlimToOwner: false,
  },
  deliveryEnd: {
    id: 1,
    orderId: 1,
    departureTime: new Date(now.getTime() - 1800000),
    arrivalTime: new Date(now.getTime() - 1000000),
    deliveryStatus: 'end',
    departureMessage: '배달 시작',
    arrivalMessage: '배달 완료',
    departureAlimToUser: false,
    arrivalAlimToUser: false,
    arrivalAlimToOwner: false,
  },
};

describe('DeliveryService', () => {
  let deliveryRepository: DeliveryRepository;
  let deliveryService: DeliveryService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([Delivery]),
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Delivery],
          synchronize: true,
        }),
      ],
      providers: [DeliveryService, DeliveryRepository],
    }).compile();
    deliveryRepository = module.get<DeliveryRepository>(DeliveryRepository);
    deliveryService = module.get<DeliveryService>(DeliveryService);
  });

  describe('updateDeliveryStart', () => {
    const id = 1;
    const time = new Date();
    it('존재하지 않는 배달건 확인', async () => {
      jest
        .spyOn(deliveryRepository, 'findDeliveryById')
        .mockResolvedValue(null);
      expect(
        deliveryService.updateDeliveryStart(id, time),
      ).rejects.toThrowError(
        new BadRequestException('존재하지 않는 배달 건 입니다.'),
      );
    });

    it('올바르지 않은 배달 상태', async () => {
      const mockDelivery = mockData.deliveryStart;
      mockDelivery.deliveryStatus = 'end';
      jest
        .spyOn(deliveryRepository, 'findDeliveryById')
        .mockResolvedValue(mockDelivery);
      jest
        .spyOn(deliveryRepository, 'updateDeliveryDeparture')
        .mockResolvedValue(mockDelivery);
      expect(
        deliveryService.updateDeliveryStart(id, time),
      ).rejects.toThrowError(
        new BadRequestException('올바르지 않은 배달 상태입니다.'),
      );
    });
  });

  describe('sendDeliveryStartAlim', () => {
    const id = 1;
    const time = new Date();

    it('배달 시작 시간 업데이트 실패', async () => {
      const mockDelivery = mockData.deliveryStart;
      mockDelivery.departureTime = null;
      jest
        .spyOn(deliveryRepository, 'findDeliveryById')
        .mockResolvedValue(mockDelivery);
      jest
        .spyOn(deliveryRepository, 'updateDeliveryDeparture')
        .mockResolvedValue(mockDelivery);
      expect(
        deliveryService.updateDeliveryStart(id, time),
      ).rejects.toThrowError(
        new BadRequestException('배달 시작 시간 업데이트에 실패했습니다.'),
      );
    });

    it('잘못된 알림 전송', async () => {
      const mockDelivery: Delivery = mockData.deliveryStart;
      mockDelivery.deliveryStatus = 'start';
      mockDelivery.departureMessage = '배달 완료';
      mockDelivery.departureTime = time;
      jest
        .spyOn(deliveryRepository, 'findDeliveryById')
        .mockResolvedValue(mockDelivery);
      jest
        .spyOn(deliveryRepository, 'updateDeliveryDeparture')
        .mockResolvedValue(mockDelivery);
      expect(
        deliveryService.updateDeliveryStart(id, time),
      ).rejects.toThrowError(
        new BadRequestException('잘못된 알림이 전송되었습니다.'),
      );
    });

    it('유저 알림 전송 안됨', async () => {
      const mockDelivery: Delivery = mockData.deliveryStart;
      mockDelivery.departureMessage = '배달 시작';
      mockDelivery.departureTime = time;
      mockDelivery.departureAlimToUser = false;
      mockDelivery.deliveryStatus = 'start';
      jest
        .spyOn(deliveryRepository, 'findDeliveryById')
        .mockResolvedValue(mockDelivery);
      jest
        .spyOn(deliveryRepository, 'updateDeliveryDeparture')
        .mockResolvedValue(mockDelivery);
      expect(
        deliveryService.updateDeliveryStart(id, time),
      ).rejects.toThrowError(
        new BadRequestException('유저 알림 전송에 실패했습니다.'),
      );
    });
  });

  describe('updateDeliveryEnd', () => {
    const id = 1;
    const time = new Date();

    it('존재하지 않는 배달건 확인', async () => {
      jest
        .spyOn(deliveryRepository, 'findDeliveryById')
        .mockResolvedValue(null);
      expect(deliveryService.updateDeliveryEnd(id, time)).rejects.toThrowError(
        new BadRequestException('존재하지 않는 배달 건 입니다.'),
      );
    });

    it('배달 완료 시간 업데이트 실패', async () => {
      const mockDelivery = mockData.deliveryEnd;
      mockDelivery.arrivalTime = null;
      jest
        .spyOn(deliveryRepository, 'findDeliveryById')
        .mockResolvedValue(mockDelivery);
      jest
        .spyOn(deliveryRepository, 'updateDeliveryArrival')
        .mockResolvedValue(mockDelivery);
      expect(deliveryService.updateDeliveryEnd(id, time)).rejects.toThrowError(
        new BadRequestException('배달 완료 시간이 업데이트 되지 않았습니다.'),
      );
    });

    it('올바르지 않은 배달 상태', async () => {
      const mockDelivery = mockData.deliveryEnd;
      mockDelivery.arrivalTime = now;
      mockDelivery.deliveryStatus = 'start';
      jest
        .spyOn(deliveryRepository, 'findDeliveryById')
        .mockResolvedValue(mockDelivery);
      jest
        .spyOn(deliveryRepository, 'updateDeliveryArrival')
        .mockResolvedValue(mockDelivery);
      expect(deliveryService.updateDeliveryEnd(id, time)).rejects.toThrowError(
        new BadRequestException('올바르지 않은 배달 상태 입니다.'),
      );
    });

    it('잘못 된 알림 전송', async () => {
      const mockDelivery = mockData.deliveryEnd;
      mockDelivery.deliveryStatus = 'end';
      mockDelivery.arrivalMessage = '배달 시작';
      jest
        .spyOn(deliveryRepository, 'findDeliveryById')
        .mockResolvedValue(mockDelivery);
      jest
        .spyOn(deliveryRepository, 'updateDeliveryArrival')
        .mockResolvedValue(mockDelivery);
      expect(deliveryService.updateDeliveryEnd(id, time)).rejects.toThrowError(
        new BadRequestException('잘못된 알림이 전송되었습니다.'),
      );
    });

    it('유저 알림 전송 실패', async () => {
      const mockDelivery = mockData.deliveryEnd;
      mockDelivery.arrivalMessage = '배달 완료';
      jest
        .spyOn(deliveryRepository, 'findDeliveryById')
        .mockResolvedValue(mockDelivery);
      jest
        .spyOn(deliveryRepository, 'updateDeliveryArrival')
        .mockResolvedValue(mockDelivery);
      expect(deliveryService.updateDeliveryEnd(id, time)).rejects.toThrowError(
        new BadRequestException('유저에게 알림이 전송되지 않았습니다.'),
      );
    });

    it('사장 알림 전송 실패', async () => {
      const mockDelivery = mockData.deliveryEnd;
      mockDelivery.arrivalAlimToUser = true;
      jest
        .spyOn(deliveryRepository, 'findDeliveryById')
        .mockResolvedValue(mockDelivery);
      jest
        .spyOn(deliveryRepository, 'updateDeliveryArrival')
        .mockResolvedValue(mockDelivery);
      expect(deliveryService.updateDeliveryEnd(id, time)).rejects.toThrowError(
        new BadRequestException('사장님에게 알림이 전송되지 않았습니다.'),
      );
    });
  });
});
