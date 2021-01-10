import { Promotion } from 'src/domain/entity/promotion.entity';
import { FilterPromotionInterface } from 'src/interfaces/interface/promotion/filter-promotion.interface';
import { PromotionInterface } from 'src/interfaces/interface/promotion/promotion.interface';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Promotion)
export class PromotionRepository extends Repository<Promotion>{

    async createPromotion(promotionInterface: PromotionInterface): Promise<Promotion>{
        const {promocode, discount, expiredFlag} = promotionInterface;

        const promotion = new Promotion();
        promotion.promocode = promocode;
        promotion.discount = discount;
        promotion.expiredFlag = expiredFlag;
        await promotion.save();

        
        delete promotion.orders;
        
        return promotion;
    }

    async getPromotions(filterPromotionInterface: FilterPromotionInterface): Promise<Promotion[]>{
        const {promocode, expiredFlag} = filterPromotionInterface;
        const query = this.createQueryBuilder('promotion');
        
        if(promocode){
            query.andWhere('promotion.promocode ILIKE :promocode', {promocode: `%${promocode}%`});
        }

        if(expiredFlag != null){
            query.andWhere('promotion.expiredFlag = :expiredFlag', {expiredFlag});
        }
        
        const promotion = await query.getMany();
        return promotion;
    }
}