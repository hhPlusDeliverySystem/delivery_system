import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { Subject } from "rxjs";
import { Delivery } from "src/modules/delivery/delivery.entity";
import { order } from "src/modules/orders/entity/order.entity";


@Injectable()
export default class notificationsConsumer {
    private  subject = new Subject< Delivery | order>();

    @OnEvent("order", { async: true })
    public handleOrderEvent(event: order){
        console.log("주문 완료", event)
        return this.subject.next(event);
    }

    @OnEvent("delivery", { async: true })
    public async handleDeliveryEvent(event: Delivery){
        console.log("베달 완료", event)
        return this.subject.next(event);
    }

    get events() {
        return this.subject.asObservable();
    }
    
}   