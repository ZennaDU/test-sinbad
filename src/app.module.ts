import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './infrastructure/config/typeOrmConfig';
import { UserModule } from './infrastructure/module/user.module';
import { PromotionModule } from './infrastructure/module/promotion.module';
import { OrderModule } from './infrastructure/module/order.module';
import { AuthModule } from './infrastructure/module/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), 
    UserModule,
    PromotionModule,
    OrderModule,
    AuthModule
  ],
})
export class AppModule {}
