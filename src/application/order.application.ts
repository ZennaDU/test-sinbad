import { Injectable, NotFoundException } from "@nestjs/common";
import { OrderService } from "src/domain/service/order.service";
import { Order } from '../domain/entity/order.entity';
import { OrderInterface } from 'src/interfaces/interface/order/order.interface';
import { User } from '../domain/entity/user.entity';
import { PromotionService } from '../domain/service/promotion.service';

@Injectable()
export class OrderApplication{
    constructor(
        private orderService: OrderService,
        private promotionService: PromotionService
        ){}
    
    async createOrder(orderInterface: OrderInterface, user: User): Promise<Order> {
        const promotion = await this.promotionService.getPromotionById(orderInterface.promotionId)
        orderInterface.promotion = promotion;
        orderInterface.totalPrice = await this.getTotalPrice(orderInterface.price, orderInterface.totalItem, promotion.discount);

        return this.orderService.createOrder(orderInterface, user)
    }

    async deleteOrder(id: string): Promise<void> {
        return this.orderService.deleteOrder(id)
    }

    async updateOrder(orderInterface: OrderInterface, user: User): Promise<Order> {
        const promotion = await this.promotionService.getPromotionById(orderInterface.promotionId)
        orderInterface.promotion = promotion;
        orderInterface.totalPrice = await this.getTotalPrice(orderInterface.price, orderInterface.totalItem, promotion.discount);
        return this.orderService.updateOrder(orderInterface, user)
    }

    async getOrderById(id: string): Promise<Order> {
        return this.orderService.getOrderById(id)
    }

    private async getTotalPrice(price:number, totalItem: number, discount:number):Promise<number>{
        var totalPrice:number = price * totalItem;
        const discountPrice:number = totalPrice * discount / 100;
        totalPrice = totalPrice - discountPrice;
        return totalPrice;
    }
    
}