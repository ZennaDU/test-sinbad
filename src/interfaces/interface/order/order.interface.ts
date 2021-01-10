import { Promotion } from "src/domain/entity/promotion.entity";

export interface OrderInterface{
    orderId?:string;
    
    promotionId: string;
    
    item: string;

    price:number;    

    totalItem:number; 

    totalPrice:number;

    promotion?:Promotion;
}