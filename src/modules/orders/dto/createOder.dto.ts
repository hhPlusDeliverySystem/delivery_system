import { IsNotEmpty,IsNumberString } from 'class-validator'

export class CreateOrderDto {

    @IsNotEmpty()
    orderId:string;

    @IsNotEmpty()
    orderStatus:string;

    @IsNotEmpty()
    @IsNumberString()
    quentity:number;

    @IsNotEmpty()
    @IsNumberString()
    totalPrice:number;


}

