import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from '../controllers/orders.controller';
import { OrderService } from '../service/orders.service'
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { order } from '../entity/order.entity';
import { CreateOrderDto } from '../dto/createOder.dto';
import { BadRequestException } from '@nestjs/common';


let mockRepository = () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  count: jest.fn()
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>

describe('OrderController', () => {
  let controller: OrderController;
  let orderService: OrderService;
  let orderReository: MockRepository<order>;

  const createOrderDto = new CreateOrderDto();
  {
    (createOrderDto.orderId = '1'),
      (createOrderDto.orderStatus = 'success'),
      (createOrderDto.quentity = 5),
      (createOrderDto.totalPrice = 10000);



    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [OrderController],

        providers: [OrderService, {
          provide: getRepositoryToken(order),
          useValue: mockRepository()
        },
        ],
      }).compile();

      controller = module.get<OrderController>(OrderController);
      orderService = module.get<OrderService>(OrderService);
      orderReository = module.get(getRepositoryToken(order));
    });


    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should create new order', async () => {
      const result = await orderService.createOrder(createOrderDto);

      expect(result).toMatchObject({ status: true, msg: 'order was successful' })
    })

    it('should fail if exists', async () => {
      const result = orderReository.findOne.mockResolvedValue(createOrderDto);

      expect(result).toMatchObject(new BadRequestException());
    })


    it('should find a order for the given id', () => {
      orderReository.findOne.mockResolvedValue(undefined);

    })


  });


