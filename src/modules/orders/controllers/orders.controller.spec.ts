import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from '../controllers/orders.controller';
import { OrderService } from '../service/orders.service';
import { CreateOrderDto } from '../dto/createOder.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let ordersService : OrderService;
  
  let createOrderDto = new CreateOrderDto();
  (createOrderDto.orderId='orderT01')


  const orderService = {
    create: jest.fn((order)=> {
      return {
        status: 'success For createOrders'
      };
    }),

    findOne: jest.fn((orderId) => {
      return {id: 'orderT01'}
    })

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],

      providers :  [OrderService,{
        provide: 'ORDERS_SERVICE',
        useValue: ordersService,   
      },
    ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    ordersService = module.get<OrderService>(OrderService);
    
    
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have create function', () =>{
    expect(ordersService.createOrder).toBeDefined();
  })

  it('shoud create order and return with successful status',()=>{

     //jest.spyOn(ordersService,'createOrder');

    expect(ordersService.createOrder).toBeCalled();

    expect(ordersService.createOrder(createOrderDto)).toEqual({
      status : 'success For createOrders'
    })
  })

  it('should find a order for the given id',() =>{
    
  })
});
