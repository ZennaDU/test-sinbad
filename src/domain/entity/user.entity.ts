import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Order } from "./order.entity";
import * as bycript from "bcrypt";

@Entity()
@Unique(['username'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Column()
    username:string;

    @Column()
    password:string;
    
    @Column()
    name:string;
    
    @Column()
    address:string;

    @Column()
    salt:string;

    @OneToMany(type => Order, order => order.user, {eager: true})
    orders: Order[];

    async validatePassword(password:string): Promise<boolean>{
        const hash = await bycript.hash(password, this.salt);
        return hash === this.password;
    }
}