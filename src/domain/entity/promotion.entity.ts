import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class Promotion extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    promotionId: string;

    @Column()
    promocode:string;

    @Column()
    discount:number;
    
    @Column({ default: false })
    expiredFlag:boolean;

    @OneToMany(type => Order, order => order.promotion,{eager:true})
    orders: Order[];
}