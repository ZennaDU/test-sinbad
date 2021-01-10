import {IsNotEmpty, IsNumber} from 'class-validator';

export class CreatePromotionDto{
    @IsNotEmpty()
    promocode: string;
    
    @IsNotEmpty()
    @IsNumber()
    discount: number;
}