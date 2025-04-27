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
import { BaseResponse, createBaseResponse } from 'src/common/base.response';
import { ValidationService } from 'src/common/validation.service';
import {
  IListPricePlanWithProductsAndOperators,
  IPricePlanProductCreate,
  IPricePlanProductResponse,
  IPricePlanProductUpdate,
} from './price-plan-product.dto';
import { PricePlanProductService } from './price-plan-product.service';
import { PricePlanProductValidation } from './price-plan-product.validation';

@Controller('price-plan-products')
export class PricePlanProductController {
  constructor(
    private pricePlanProductService: PricePlanProductService,
    private validationService: ValidationService,
  ) {}

  @Get('/price-plans/:pricePlanId')
  async findAllBypricePlanId(
    @Param('pricePlanId', ParseIntPipe) pricePlanId: number,
  ): Promise<BaseResponse<IListPricePlanWithProductsAndOperators[]>> {
    const result =
      await this.pricePlanProductService.findAllBypricePlanId(pricePlanId);
    return createBaseResponse(result);
  }

  @Post()
  async create(
    @Body() pricePlanProduct: IPricePlanProductCreate,
  ): Promise<BaseResponse<IPricePlanProductResponse>> {
    const validatePricePlanProduct = this.validationService.validate(
      PricePlanProductValidation.CREATE,
      pricePlanProduct,
    );
    const result = await this.pricePlanProductService.create({
      productId: validatePricePlanProduct.productId,
      pricePlanId: validatePricePlanProduct.pricePlanId,
      sellPrice: validatePricePlanProduct.sellPrice,
      margin: validatePricePlanProduct.margin,
      isActive: validatePricePlanProduct.isActive,
    });
    return createBaseResponse(result);
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() pricePlanProduct: IPricePlanProductUpdate,
  ): Promise<BaseResponse<IPricePlanProductResponse>> {
    const validatePricePlanProduct = this.validationService.validate(
      PricePlanProductValidation.UPDATE,
      { ...pricePlanProduct, id },
    );
    const result = await this.pricePlanProductService.update({
      id,
      sellPrice: validatePricePlanProduct.sellPrice,
      margin: validatePricePlanProduct.margin,
      isActive: validatePricePlanProduct.isActive,
    });
    return createBaseResponse(result);
  }

  @Delete('/:id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseResponse<void>> {
    await this.pricePlanProductService.delete(id);
    return createBaseResponse(null);
  }
}
