import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { OrderApplication } from "src/application/order.application";
import { CreateOrderDto } from '../dto/Order/create-order.dto';
import { UpdateOrderDto } from '../dto/Order/update-order.dto';
import { IdDto } from "../dto/Id.dto";
import { OrderInterface } from "../interface/order/order.interface";
import { User } from "src/domain/entity/user.entity";
import { GetUser } from '../decorator/get-user.decorator';
import { AuthGuard } from "@nestjs/passport";

@Controller('order')
@UseGuards(AuthGuard())
export class OrderController {
    constructor(private orderApplication: OrderApplication){}

    @Post()
    @UsePipes(ValidationPipe)
    createOrder(
        @Body() createOrderDto: CreateOrderDto,
        @GetUser() user: User,
    ){
        let orderInterface:OrderInterface = {
            item : createOrderDto.item,
            price: createOrderDto.price,
            totalItem: createOrderDto.totalItem,
            promotionId: createOrderDto.promotionId,
            totalPrice : null,
        };
        return this.orderApplication.createOrder(orderInterface, user);
    }

    @Patch()
    @UsePipes(ValidationPipe)
    updateOrder(
        @Body() updateOrderDto: UpdateOrderDto,
        @GetUser() user: User,
    ){
        let orderInterface:OrderInterface = {
            item : updateOrderDto.item,
            price: updateOrderDto.price,
            totalItem: updateOrderDto.totalItem,
            promotionId: updateOrderDto.promotionId,
            totalPrice : null
        };
        return this.orderApplication.updateOrder(orderInterface, user);
    }

    @Delete()
    @UsePipes(ValidationPipe)
    deleteOrder(@Body() idDto: IdDto){
        return this.orderApplication.deleteOrder(idDto.id);
    }

    @Get('/:id')
    @UsePipes(ValidationPipe)
    getPromotionById(@Param('id', ParseUUIDPipe) id: string){
        return this.orderApplication.getOrderById(id);
    }
}