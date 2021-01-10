import { Promotion } from "src/domain/entity/promotion.entity";

export interface PromotionInterface{
    promotionId?: string;
    
    promocode: string;
    
    discount: number;

    expiredFlag?:boolean;

    promotion?:Promotion;
}