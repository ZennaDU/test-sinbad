import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './infrastructure/config/typeOrmConfig';
import { UserModule } from './infrastructure/module/user.module';
import { PromotionModule } from './infrastructure/module/promotion.module';
import { OrderModule } from './infrastructure/module/order.module';
import { AuthModule } from './infrastructure/module/auth.module';
import { configService } from './infrastructure/config/ConfigService';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()), 
    UserModule,
    PromotionModule,
    OrderModule,
    AuthModule
  ],
})
export class AppModule {}
