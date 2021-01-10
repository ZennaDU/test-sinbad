import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionController } from '../../interfaces/controller/promotion.controller';
import { PromotionApplication } from '../../application/promotion.application';
import { PromotionService } from '../../domain/service/promotion.service';
import { PromotionRepository } from '../repository/promotion.repository';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PromotionRepository]),
    AuthModule
  ],
  controllers: [PromotionController],
  providers: [PromotionApplication, PromotionService],
  exports:[PromotionService]
})
export class PromotionModule {}
