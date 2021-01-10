import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class UpdateOrderDto{
    @IsNotEmpty()
    @IsUUID()
    orderId:string;

    @IsNotEmpty()
    @IsUUID()
    userId:string;

    @IsNotEmpty()
    @IsUUID()
    promotionId: string;
    
    @IsNotEmpty()
    item: string;

    @IsNotEmpty()
    @IsNumber()
    price:number;    

    @IsNotEmpty()
    @IsNumber()
    totalItem:number;
}