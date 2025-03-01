import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { BaseResponse, createBaseResponse } from 'src/common/base.response';
import { IProductTypeCreate, IProductTypeResponse } from './product-type.dto';
import { ValidationService } from 'src/common/validation.service';
import { ProductTypeValidation } from './product-type.validation';

@Controller('product-types')
export class ProductTypeController {
  constructor(
    private productTypeService: ProductTypeService,
    private validationService: ValidationService,
  ) {}

  @Get()
  async findAll(): Promise<BaseResponse<IProductTypeResponse[]>> {
    const results = await this.productTypeService.findAll();
    return createBaseResponse(results);
  }

  @Post()
  async create(
    @Body() productType: IProductTypeCreate,
  ): Promise<BaseResponse<IProductTypeResponse>> {
    const validationProductType = this.validationService.validate(
      ProductTypeValidation.CREATE,
      productType,
    );
    const result = await this.productTypeService.create({
      name: validationProductType.name,
    });
    return createBaseResponse(result);
  }
}
