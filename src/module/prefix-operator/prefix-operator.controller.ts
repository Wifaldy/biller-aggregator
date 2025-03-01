import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  IPrefixOperatorCreate,
  IPrefixOperatorResponse,
} from './prefix-operator.dto';
import { BaseResponse, createBaseResponse } from 'src/common/base.response';
import { PrefixOperatorService } from './prefix-operator.service';
import { ValidationService } from 'src/common/validation.service';
import { PrefixOperatorValidation } from './prefix-operator.validation';

@Controller('prefix-operators')
export class PrefixOperatorController {
  constructor(
    private prefixOperatorService: PrefixOperatorService,
    private validationService: ValidationService,
  ) {}
  @Post()
  async create(
    @Body() prefixOperator: IPrefixOperatorCreate,
  ): Promise<BaseResponse<IPrefixOperatorResponse>> {
    const validatePrefixOperator = this.validationService.validate(
      PrefixOperatorValidation.CREATE,
      prefixOperator,
    );
    const result = await this.prefixOperatorService.create({
      operatorId: validatePrefixOperator.operatorId,
      prefix: validatePrefixOperator.prefix,
    });
    return createBaseResponse(result);
  }

  @Delete('/:id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseResponse<null>> {
    const validatePrefixOperator = this.validationService.validate(
      PrefixOperatorValidation.FIND_BY_ID,
      id,
    );
    await this.prefixOperatorService.delete(validatePrefixOperator);
    return createBaseResponse(null);
  }
}
