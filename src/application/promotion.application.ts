import { Injectable } from "@nestjs/common";
import { PromotionService } from '../domain/service/promotion.service';
import { Promotion } from '../domain/entity/promotion.entity';
import { PromotionInterface } from 'src/interfaces/interface/promotion/promotion.interface';
import { FilterPromotionInterface } from 'src/interfaces/interface/promotion/filter-promotion.interface';

@Injectable()
export class PromotionApplication{
    constructor(private promotionService: PromotionService){}
    
    async createPromotion(promotionInterface: PromotionInterface): Promise<Promotion> {
        return this.promotionService.createPromotion(promotionInterface)
    }

    async deletePromotion(id: string): Promise<void> {
        return this.promotionService.deletePromotion(id)
    }

    async updatePromotion(promotionInterface: PromotionInterface): Promise<Promotion> {
        return this.promotionService.updatePromotion(promotionInterface)
    }

    async getPromotionById(id: string): Promise<Promotion> {
        return this.promotionService.getPromotionById(id)
    }
    
    async getPromotions(filterPromotionInterface: FilterPromotionInterface): Promise<Promotion[]> {
        return this.promotionService.getPromotions(filterPromotionInterface)
    }
    
}