import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateOrderDto{
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