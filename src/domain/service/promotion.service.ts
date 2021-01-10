import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PromotionRepository } from '../../infrastructure/repository/promotion.repository';
import { Promotion } from '../entity/promotion.entity';
import { PromotionInterface } from 'src/interfaces/interface/promotion/promotion.interface';
import { FilterPromotionInterface } from 'src/interfaces/interface/promotion/filter-promotion.interface';

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(PromotionRepository)
    private promotionRepository: PromotionRepository,
  ){}

  async getPromotionById(id: string): Promise<Promotion>{
    const promotion = await this.promotionRepository.findOne(id);
    
    if(!promotion){
      throw new NotFoundException(`Promotion with ID "${id}" not found`);
    }

    return promotion;
  }

  async createPromotion(promotionInterface: PromotionInterface): Promise<Promotion> {
    return this.promotionRepository.createPromotion(promotionInterface)
  }

  async deletePromotion(id: string): Promise<void>{
    const result = await this.promotionRepository.delete(id);

    if(result.affected === 0){
        throw new NotFoundException(`Promotion with ID "${id}" not found`);
    }
  }

  async getPromotions(filterPromotionInterface: FilterPromotionInterface): Promise<Promotion[]> {
    return this.promotionRepository.getPromotions(filterPromotionInterface)
  }

  async updatePromotion(promotionInterface: PromotionInterface): Promise<Promotion> {
    const promotion = await this.getPromotionById(promotionInterface.promotionId)
    promotion.promocode = promotionInterface.promocode;
    promotion.discount = promotionInterface.discount;
    promotion.expiredFlag = promotionInterface.expiredFlag;
    await promotion.save();
    return promotion;
  }

}