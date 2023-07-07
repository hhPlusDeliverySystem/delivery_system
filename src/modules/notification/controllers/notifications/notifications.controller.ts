import { Body, Controller, Get, Param, Req, Res, Sse} from '@nestjs/common';
import { Observable, delay, filter, interval, map, merge } from 'rxjs';
import { CreateOrderDto } from 'src/modules/orders/dto/createOder.dto';
import notificationsConsumer from './notificationCosumer';
import { Delivery } from 'src/modules/delivery/delivery.entity';



interface MessageEvent {
        data : string | object | number;
}
@Controller('notifications')
export class NotificationsController {

    constructor(private readonly notificationEvents: notificationsConsumer){}
 

   @Sse('/:orderId')
   sendOrderNotification(@Body() createOrderDto: CreateOrderDto): Observable<MessageEvent>{
        const order$ = interval(100000).pipe(
            map(() => ({
                type: "order",data:"-"
            }))
        )

        const update$ = this.notificationEvents.events.pipe(
            delay(60),
            filter((event) => event.orderId === createOrderDto.orderId),
            map((event) => ({
                type: "updateOrder", data: event.orderId
            }as MessageEvent ))
        )

    return merge(order$, update$);
   }
    
   @Sse('/:deliveryId')
   sendDeliveryNotification(@Body() delivery: Delivery): Observable<MessageEvent>{
        const delivery$ = interval(100000).pipe(
            map(() => ({
                type: "delivery", data:"_"
            }))
        )

        const update$ = this.notificationEvents.events.pipe(
            delay(60),
            filter((event) => event.id === delivery.id),
            map((event) => ({
                type: "updateDelivery", data: event.id
            }as MessageEvent))
        )

    return merge(delivery$, update$);
   }


}
