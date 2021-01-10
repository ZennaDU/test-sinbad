import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from '../../interfaces/controller/order.controller';
import { OrderApplication } from '../../application/order.application';
import { OrderService } from '../../domain/service/order.service';
import { OrderRepository } from '../repository/order.repository';
import { AuthModule } from './auth.module';
import { UserModule } from './user.module';
import { PromotionModule } from './promotion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderRepository]),
    AuthModule,
    UserModule,
    PromotionModule
  ],
  controllers: [OrderController],
  providers: [OrderApplication,OrderService],
})
export class OrderModule {}
