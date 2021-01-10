import { IsBoolean, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class UpdatePromotionDto{
    @IsNotEmpty()
    @IsUUID()
    promotionId: string;

    @IsNotEmpty()
    promocode: string;
    
    @IsNotEmpty()
    @IsNumber()
    discount: number;

    @IsNotEmpty()
    @IsBoolean()
    expiredFlag: boolean;
}