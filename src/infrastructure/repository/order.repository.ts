import { OrderInterface } from "src/interfaces/interface/order/order.interface";
import { EntityRepository, Repository } from "typeorm";
import { Order } from '../../domain/entity/order.entity';
import { User } from '../../domain/entity/user.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order>{
    async createOrder(orderInterface: OrderInterface, user: User): Promise<Order>{

        const {promotion, item, price, totalItem, totalPrice} = orderInterface;

        const order = new Order();
        order.item = item;
        order.price = price;
        order.totalItem = totalItem;
        order.totalPrice = totalPrice;
        order.user = user;
        order.promotion = promotion;
        await order.save();
        
        delete order.user;
        delete order.promotion;

        return order;
    }

    async updateOrder(orderInterface: OrderInterface, user: User): Promise<Order>{

        const {promotion, item, price, totalItem, totalPrice, orderId} = orderInterface;

        const order = await this.findOne( {orderId} );
        order.item = item;
        order.price = price;
        order.totalItem = totalItem;
        order.totalPrice = totalPrice;
        order.user = user;
        order.promotion = promotion;
        await order.save();
        
        delete order.user;
        delete order.promotion;

        return order;
    }
}