import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PricePlanService } from './price-plan.service';
import { ValidationService } from 'src/common/validation.service';
import { BaseResponse, createBaseResponse } from 'src/common/base.response';
import {
  IPricePlanCreate,
  IPricePlanResponse,
  IPricePlanUpdate,
} from './price-plan.dto';
import { PricePlanValidation } from './price-plan.validation';

@Controller('price-plans')
export class PricePlanController {
  constructor(
    private readonly pricePlanService: PricePlanService,
    private validationService: ValidationService,
  ) {}

  @Get()
  async findAll(): Promise<BaseResponse<IPricePlanResponse[]>> {
    const results = await this.pricePlanService.findAll();
    return createBaseResponse(results);
  }

  @Get('/:id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseResponse<IPricePlanResponse>> {
    const validatePricePlan = await this.validationService.validate(
      PricePlanValidation.FIND_BY_ID,
      id,
    );
    const result = await this.pricePlanService.findById(validatePricePlan);
    return createBaseResponse(result);
  }

  @Post()
  async create(
    @Body()
    pricePlan: IPricePlanCreate,
  ): Promise<BaseResponse<IPricePlanResponse>> {
    const validatePricePlan = this.validationService.validate(
      PricePlanValidation.CREATE,
      pricePlan,
    );
    const result = await this.pricePlanService.create({
      name: validatePricePlan.name,
    });
    return createBaseResponse(result);
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() pricePlan: IPricePlanUpdate,
  ): Promise<BaseResponse<IPricePlanResponse>> {
    const validatePricePlan = this.validationService.validate(
      PricePlanValidation.UPDATE,
      { ...pricePlan, id },
    );
    const result = await this.pricePlanService.update({
      id,
      name: validatePricePlan.name,
    });
    return createBaseResponse(result);
  }

  @Delete('/:id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseResponse<void>> {
    const validatePricePlan = await this.validationService.validate(
      PricePlanValidation.FIND_BY_ID,
      id,
    );
    await this.pricePlanService.delete(validatePricePlan);
    return createBaseResponse(null);
  }
}
