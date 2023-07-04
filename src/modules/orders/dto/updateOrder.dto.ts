import { IsNotEmpty,IsNumberString } from 'class-validator'

export class UpdateOrderDto {

    @IsNotEmpty()
    @IsNumberString()
    quentity:number;

    @IsNotEmpty()
    @IsNumberString()
    totalPrice:number;

    
}

