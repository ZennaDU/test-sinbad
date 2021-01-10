export interface OrderInterface{
    orderId?:string;

    userId : string;
    
    promotionId: string;
    
    item: string;

    price:number;    

    totalItem:number; 

    totalPrice:number;
}