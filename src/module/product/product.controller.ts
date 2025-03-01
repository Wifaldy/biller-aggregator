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
import { ProductService } from './product.service';
import { BaseResponse, createBaseResponse } from 'src/common/base.response';
import {
  IProductCreate,
  IProductResponse,
  IProductUpdate,
} from './product.dto';
import { ValidationService } from 'src/common/validation.service';
import { ProductValidation } from './product.validation';
import { parseTimeToDate } from 'src/common/time.helper';

@Controller('products')
export class ProductController {
  constructor(
    private productService: ProductService,
    private validationService: ValidationService,
  ) {}

  @Get()
  async findAll(): Promise<BaseResponse<IProductResponse[]>> {
    const results = await this.productService.findAll();
    return createBaseResponse(results);
  }

  @Get('/:id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseResponse<IProductResponse>> {
    const validateProduct = await this.validationService.validate(
      ProductValidation.FIND_BY_ID,
      id,
    );
    const result = await this.productService.findById(validateProduct);
    return createBaseResponse(result);
  }

  @Post()
  async create(
    @Body() product: IProductCreate,
  ): Promise<BaseResponse<IProductResponse>> {
    const validateProduct = await this.validationService.validate(
      ProductValidation.CREATE,
      {
        ...product,
        operationalTimeStart: `${product.operationalTimeStart}`,
        operationalTimeEnd: `${product.operationalTimeEnd}`,
      },
    );
    const result = await this.productService.create({
      operatorId: validateProduct.operatorId,
      productTypeId: validateProduct.productTypeId,
      name: validateProduct.name,
      code: validateProduct.code,
      description: validateProduct.description,
      operationalTimeStart: parseTimeToDate(
        validateProduct.operationalTimeStart,
      ),
      operationalTimeEnd: parseTimeToDate(validateProduct.operationalTimeEnd),
      isEmpty: validateProduct.isEmpty,
      isProblem: validateProduct.isProblem,
    });
    return createBaseResponse(result);
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: IProductUpdate,
  ): Promise<BaseResponse<IProductResponse>> {
    const validateProduct = await this.validationService.validate(
      ProductValidation.UPDATE,
      {
        ...product,
        operationalTimeStart: `${product.operationalTimeStart}`,
        operationalTimeEnd: `${product.operationalTimeEnd}`,
        id,
      },
    );
    const result = await this.productService.update({
      id: validateProduct.id,
      operatorId: validateProduct.operatorId,
      productTypeId: validateProduct.productTypeId,
      name: validateProduct.name,
      code: validateProduct.code,
      description: validateProduct.description,
      operationalTimeStart: parseTimeToDate(
        validateProduct.operationalTimeStart,
      ),
      operationalTimeEnd: parseTimeToDate(validateProduct.operationalTimeEnd),
      isEmpty: validateProduct.isEmpty,
      isProblem: validateProduct.isProblem,
    });
    return createBaseResponse(result);
  }

  @Delete('/:id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseResponse<void>> {
    const validateProduct = await this.validationService.validate(
      ProductValidation.FIND_BY_ID,
      id,
    );
    await this.productService.delete(validateProduct);

    return createBaseResponse(null);
  }
}
