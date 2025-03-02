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
import { OperatorService } from './operator.service';
import { BaseResponse, createBaseResponse } from 'src/common/base.response';
import {
  IOperatorCreate,
  IOperatorResponse,
  IOperatorUpdate,
} from './operator.dto';
import { ValidationService } from 'src/common/validation.service';
import { OperatorValidation } from './operator.validation';

@Controller('operators')
export class OperatorController {
  constructor(
    private operatorService: OperatorService,
    private validationService: ValidationService,
  ) {}

  @Get()
  async findAll(): Promise<BaseResponse<IOperatorResponse[]>> {
    const results = await this.operatorService.findAll();
    return createBaseResponse(results);
  }

  @Get('/prefix/:id')
  async findOperatorWithPrefixOperator(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseResponse<IOperatorResponse>> {
    const validateOperator = await this.validationService.validate(
      OperatorValidation.FIND_BY_ID,
      id,
    );
    const result =
      await this.operatorService.findOperatorWithPrefixOperators(
        validateOperator,
      );
    return createBaseResponse(result);
  }

  @Get('/products')
  async findAllOperatorsWithProducts(): Promise<
    BaseResponse<IOperatorResponse[]>
  > {
    const result = await this.operatorService.findAllOperatorsWithProducts();
    return createBaseResponse(result);
  }

  @Post()
  async create(
    @Body() operator: IOperatorCreate,
  ): Promise<BaseResponse<IOperatorResponse>> {
    const validateOperator = await this.validationService.validate(
      OperatorValidation.CREATE,
      operator,
    );

    const result = await this.operatorService.create({
      name: validateOperator.name,
      minDigit: validateOperator.minDigit,
      maxDigit: validateOperator.maxDigit,
    });

    return createBaseResponse(result);
  }

  @Get('/:id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseResponse<IOperatorResponse>> {
    const validateOperator = await this.validationService.validate(
      OperatorValidation.FIND_BY_ID,
      id,
    );
    const result = await this.operatorService.findById(validateOperator);
    return createBaseResponse(result);
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() operator: IOperatorUpdate,
  ): Promise<BaseResponse<IOperatorResponse>> {
    const validateOperator = this.validationService.validate(
      OperatorValidation.UPDATE,
      {
        ...operator,
        id,
      },
    );

    const result = await this.operatorService.update({
      id: validateOperator.id,
      name: validateOperator.name,
      maxDigit: validateOperator.maxDigit,
      minDigit: validateOperator.minDigit,
    });

    return createBaseResponse(result);
  }

  @Delete('/:id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseResponse<IOperatorResponse>> {
    const validateOperator = await this.validationService.validate(
      OperatorValidation.FIND_BY_ID,
      id,
    );
    await this.operatorService.delete(validateOperator);
    return createBaseResponse(null);
  }
}
