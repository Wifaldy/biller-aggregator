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
import { BalanceType, BalanceTypeEnum } from 'src/common/constants';
import { ValidationService } from 'src/common/validation.service';
import {
  IPartnerCreate,
  IPartnerResetCredentials,
  IPartnerResponse,
  IPartnerUpdate,
} from './partner.dto';
import { PartnerService } from './partner.service';
import { PartnerValidation } from './partner.validation';

@Controller('partners')
export class PartnerController {
  constructor(
    private readonly partnerService: PartnerService,
    private readonly validationService: ValidationService,
  ) {}

  @Post()
  async create(
    @Body() partner: IPartnerCreate,
  ): Promise<BaseResponse<IPartnerResponse>> {
    const validatePartner = this.validationService.validate(
      PartnerValidation.CREATE,
      {
        ...partner,
        balanceType: partner.balanceType?.toUpperCase() as BalanceTypeEnum,
      },
    );
    const result = await this.partnerService.create({
      address: validatePartner.address,
      name: validatePartner.name,
      pricePlanId: validatePartner.pricePlanId,
      balance: validatePartner.balance,
      isActive: validatePartner.isActive,
      balanceType: validatePartner.balanceType as BalanceType,
      email: validatePartner.email,
      password: validatePartner.password,
      phone: validatePartner.phone,
      pin: validatePartner.pin,
      username: validatePartner.username,
    });
    return createBaseResponse(result);
  }

  @Get('/:id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseResponse<IPartnerResponse>> {
    const validatePartner = this.validationService.validate(
      PartnerValidation.FIND_BY_ID,
      id,
    );
    const result = await this.partnerService.findById(validatePartner);
    return createBaseResponse(result);
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() partner: IPartnerUpdate,
  ): Promise<BaseResponse<IPartnerResponse>> {
    const validatePartner = this.validationService.validate(
      PartnerValidation.UPDATE,
      {
        ...partner,
        id,
        balanceType: partner.balanceType?.toUpperCase() as BalanceTypeEnum,
      },
    );
    const result = await this.partnerService.update({
      id: validatePartner.id,
      address: validatePartner.address,
      name: validatePartner.name,
      pricePlanId: validatePartner.pricePlanId,
      isActive: validatePartner.isActive,
      balanceType: validatePartner.balanceType as BalanceType,
      email: validatePartner.email,
      phone: validatePartner.phone,
    });
    return createBaseResponse(result);
  }

  @Put('/:id/reset-credentials')
  async resetCredentials(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseResponse<IPartnerResetCredentials>> {
    const validatePartner = this.validationService.validate(
      PartnerValidation.FIND_BY_ID,
      id,
    );
    const result = await this.partnerService.resetCredentials(validatePartner);
    return createBaseResponse(result);
  }

  @Delete('/:id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseResponse<void>> {
    const validatePartner = this.validationService.validate(
      PartnerValidation.FIND_BY_ID,
      id,
    );
    await this.partnerService.delete(validatePartner);
    return createBaseResponse(null);
  }

  @Put('/:id/top-up')
  async topUp(
    @Param('id', ParseIntPipe) id: number,
    @Body('balance') balance: number,
  ): Promise<BaseResponse<IPartnerResponse>> {
    const validatePartner = this.validationService.validate(
      PartnerValidation.TOP_UP,
      {
        id,
        balance,
      },
    );
    const result = await this.partnerService.topUpBalance(
      validatePartner.id,
      validatePartner.balance,
    );
    return createBaseResponse(result);
  }
}
