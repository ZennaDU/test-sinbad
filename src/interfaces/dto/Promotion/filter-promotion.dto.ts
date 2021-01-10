import { IsBoolean } from 'class-validator';

export class FilterPromotionDto{
    promocode: string;

    expiredFlag: boolean;
}