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
import { ISupplierCreate, ISupplierResponse } from './supplier.dto';
import { SupplierService } from './supplier.service';
import { SupplierValidation } from './supplier.validation';

@Controller('suppliers')
export class SupplierController {
  constructor(
    private supplierService: SupplierService,
    private validationService: ValidationService, // Assuming you have a ValidationService for validation
  ) {}

  @Get('/')
  async findAll(): Promise<BaseResponse<ISupplierResponse[]>> {
    const result = await this.supplierService.findAll();
    return createBaseResponse(result);
  }

  @Get('/:id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseResponse<ISupplierResponse>> {
    const validateSupplier = await this.validationService.validate(
      SupplierValidation.FIND_BY_ID,
      id,
    );
    const result = await this.supplierService.findById(validateSupplier);
    return createBaseResponse(result);
  }

  @Post()
  async create(
    @Body() supplier: ISupplierCreate,
  ): Promise<BaseResponse<ISupplierResponse>> {
    const validateSupplier = await this.validationService.validate(
      SupplierValidation.CREATE,
      supplier,
    );
    const result = await this.supplierService.create({
      name: validateSupplier.name,
    });
    return createBaseResponse(result);
  }

  @Put('/:id')
  async update(
    @Body() supplier: ISupplierCreate,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseResponse<ISupplierResponse>> {
    const validateSupplier = await this.validationService.validate(
      SupplierValidation.UPDATE,
      {
        ...supplier,
        id,
      },
    );
    const result = await this.supplierService.update({
      id: validateSupplier.id,
      name: validateSupplier.name,
    });
    return createBaseResponse(result);
  }

  @Delete('/:id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseResponse<void>> {
    const validateSupplier = await this.validationService.validate(
      SupplierValidation.FIND_BY_ID,
      id,
    );
    await this.supplierService.delete(validateSupplier);
    return createBaseResponse(null);
  }
}
