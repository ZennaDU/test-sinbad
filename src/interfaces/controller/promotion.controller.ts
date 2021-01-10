import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PromotionApplication } from '../../application/promotion.application';
import { IdDto } from '../dto/Id.dto';
import { CreatePromotionDto } from '../dto/Promotion/create-promotion.dto';
import { UpdatePromotionDto } from '../dto/Promotion/update-promotion.dto';
import { FilterPromotionDto } from '../dto/Promotion/filter-promotion.dto';
@Controller('promotion')
export class PromotionController {
    constructor(private promotionApplication: PromotionApplication){}

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createPromotionDto: CreatePromotionDto){
        return this.promotionApplication.createPromotion(createPromotionDto);
    }

    @Patch()
    @UsePipes(ValidationPipe)
    updateUser(@Body() updatePromotionDto: UpdatePromotionDto){
        return this.promotionApplication.updatePromotion(updatePromotionDto);
    }

    @Delete()
    @UsePipes(ValidationPipe)
    deletePromotion(@Body() idDto: IdDto){
        return this.promotionApplication.deletePromotion(idDto.id);
    }
    
    @Get('/:id')
    @UsePipes(ValidationPipe)
    getPromotionById(@Param('id', ParseUUIDPipe) id: string){
        return this.promotionApplication.getPromotionById(id);
    }

    @Post("/filter")
    @UsePipes(ValidationPipe)
    getPromotions(@Body() filterPromotionDto: FilterPromotionDto){
        return this.promotionApplication.getPromotions(filterPromotionDto);
    }
}