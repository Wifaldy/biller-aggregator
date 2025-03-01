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
import { RoleService } from './role.service';
import { BaseResponse, createBaseResponse } from 'src/common/base.response';
import { IRoleCreate, IRoleResponse } from './role.dto';
import { ValidationService } from 'src/common/validation.service';
import { RoleValidation } from './role.validation';

@Controller('roles')
export class RoleController {
  constructor(
    private roleService: RoleService,
    private validationService: ValidationService,
  ) {}

  @Get('/')
  async findAll(): Promise<BaseResponse<IRoleResponse[]>> {
    const result = await this.roleService.findAll();
    return createBaseResponse(result);
  }

  @Get('/:id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseResponse<IRoleResponse>> {
    const validateUser = await this.validationService.validate(
      RoleValidation.FIND_BY_ID,
      id,
    );
    const result = await this.roleService.findById(validateUser);
    return createBaseResponse(result);
  }

  @Post()
  async create(
    @Body() role: IRoleCreate,
  ): Promise<BaseResponse<IRoleResponse>> {
    const validateRole = await this.validationService.validate(
      RoleValidation.CREATE,
      role,
    );
    const result = await this.roleService.create({
      name: validateRole.name,
    });
    return createBaseResponse(result);
  }

  @Put('/:id')
  async update(
    @Body() role: IRoleCreate,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseResponse<IRoleResponse>> {
    const validateRole = await this.validationService.validate(
      RoleValidation.UPDATE,
      {
        ...role,
        id,
      },
    );
    const result = await this.roleService.update({
      id: validateRole.id,
      name: validateRole.name,
    });
    return createBaseResponse(result);
  }

  @Delete('/:id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseResponse<void>> {
    const validateRole = await this.validationService.validate(
      RoleValidation.FIND_BY_ID,
      id,
    );
    await this.roleService.delete(validateRole);
    return createBaseResponse(null);
  }
}
