import { BaseEntity, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Promotion } from "./promotion.entity";
import { User } from './user.entity';

@Entity()
export class Order extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    orderId: string;

    @Column()
    item:string;
    
    @Column()
    price:number;

    @Column()
    totalItem:number;

    @Column()
    totalPrice:number;

    @ManyToOne(type => User, user => user.orders, {eager: false})
    user: User;

    @ManyToOne(type => Promotion, promotion => promotion.orders, {eager: false})
    promotion: Promotion;
    
}