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
  IProductSupplierCreate,
  IProductSupplierResponse,
} from './product-supplier.dto';
import { ProductSupplierService } from './product-supplier.service';
import { ProductSupplierValidation } from './product-supplier.validation';

@Controller('product-suppliers')
export class ProductSupplierController {
  constructor(
    private productSupplierService: ProductSupplierService,
    private validationService: ValidationService,
  ) {}

  @Get('/')
  async findAll(): Promise<BaseResponse<IProductSupplierResponse[]>> {
    const result = await this.productSupplierService.findAll();
    return createBaseResponse(result);
  }

  @Get('/:id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseResponse<IProductSupplierResponse>> {
    const validateProductSupplier = await this.validationService.validate(
      ProductSupplierValidation.FIND_BY_ID,
      id,
    );
    const result = await this.productSupplierService.findById(
      validateProductSupplier,
    );
    return createBaseResponse(result);
  }

  @Post()
  async create(
    @Body() supplier: IProductSupplierCreate,
  ): Promise<BaseResponse<IProductSupplierResponse>> {
    const validateProductSupplier = await this.validationService.validate(
      ProductSupplierValidation.CREATE,
      supplier,
    );
    const result = await this.productSupplierService.create({
      supplierId: validateProductSupplier.supplierId,
      productId: validateProductSupplier.productId,
      code: validateProductSupplier.code,
      isActive: validateProductSupplier.isActive,
      priority: validateProductSupplier.priority,
      buyPrice: validateProductSupplier.buyPrice,
    });
    return createBaseResponse(result);
  }

  @Put('/:id')
  async update(
    @Body() supplier: IProductSupplierCreate,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseResponse<IProductSupplierResponse>> {
    const validateProductSupplier = await this.validationService.validate(
      ProductSupplierValidation.UPDATE,
      {
        ...supplier,
        id,
      },
    );
    const result = await this.productSupplierService.update({
      id: validateProductSupplier.id,
      supplierId: validateProductSupplier.supplierId,
      productId: validateProductSupplier.productId,
      code: validateProductSupplier.code,
      isActive: validateProductSupplier.isActive,
      priority: validateProductSupplier.priority,
    });
    return createBaseResponse(result);
  }

  @Delete('/:id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseResponse<void>> {
    const validateProductSupplier = await this.validationService.validate(
      ProductSupplierValidation.FIND_BY_ID,
      id,
    );
    await this.productSupplierService.delete(validateProductSupplier);
    return createBaseResponse(null);
  }
}
