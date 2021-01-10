import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from '../entity/order.entity';
import { OrderRepository } from "src/infrastructure/repository/order.repository";
import { OrderInterface } from 'src/interfaces/interface/order/order.interface';
import { User } from "../entity/user.entity";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
  ){}

  async getOrderById(id: string): Promise<Order>{
    const order = await this.orderRepository.findOne(id);
    
    if(!order){
      throw new NotFoundException(`Order with ID "${id}" not found`);
    }

    return order;
  }

  async createOrder(orderInterface: OrderInterface, user:User): Promise<Order> {
    return this.orderRepository.createOrder(orderInterface, user)
  }

  async deleteOrder(id: string): Promise<void>{
    const result = await this.orderRepository.delete(id);

    if(result.affected === 0){
        throw new NotFoundException(`Order with ID "${id}" not found`);
    }
  }

  async updateOrder(orderInterface: OrderInterface, user:User): Promise<Order> {
    return this.orderRepository.updateOrder(orderInterface, user);
  }

}