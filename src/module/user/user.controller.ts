import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { IPaginationResponse } from 'src/common/pagination.interface';
import { ValidationService } from 'src/common/validation.service';
import { BaseResponse, createBaseResponse } from '../../common/base.response';
import {
  IUserPaginationRequest,
  IUserRegister,
  IUserResponse,
  IUserUpdate,
} from './user.dto';
import { UserService } from './user.service';
import { UserValidation } from './user.validation';

@Controller('users')
export class UserController {
  constructor(
    private userSerivce: UserService,
    private validationService: ValidationService,
  ) {}

  @Post()
  async create(
    @Body() user: IUserRegister,
  ): Promise<BaseResponse<IUserResponse>> {
    const validateUser = this.validationService.validate(
      UserValidation.REGISTER,
      user,
    );
    const result = await this.userSerivce.create({
      name: validateUser.name,
      password: validateUser.password,
      roleId: validateUser.roleId,
      username: validateUser.username,
    });
    return createBaseResponse(result);
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query() query: IUserPaginationRequest,
  ): Promise<
    BaseResponse<IUserResponse[] | IPaginationResponse<IUserResponse>>
  > {
    const validatePagination = this.validationService.validate(
      UserValidation.PAGINATION,
      {
        limit: query.limit ? +query.limit : 0,
        page: query.page ? +query.page : 0,
        name: query.name,
      },
    );

    if (validatePagination.limit == 0 || validatePagination.page == 0) {
      const result = await this.userSerivce.findAll();
      return createBaseResponse(result);
    }
    const result =
      await this.userSerivce.findAllWithPagination(validatePagination);
    return createBaseResponse(result);
  }
  @Get('/:id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseResponse<IUserResponse>> {
    const validateUser = await this.validationService.validate(
      UserValidation.FIND_BY_ID,
      id,
    );
    const result = await this.userSerivce.findByIdWithRole(validateUser);
    return createBaseResponse(result);
  }
  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: IUserUpdate,
  ): Promise<BaseResponse<IUserResponse>> {
    const validateUser = this.validationService.validate(
      UserValidation.UPDATE,
      {
        ...user,
        id,
      },
    );
    const result = await this.userSerivce.update({
      id: validateUser.id,
      name: validateUser.name,
      roleId: validateUser.roleId,
    });
    return createBaseResponse(result);
  }
  @Delete('/:id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseResponse<void>> {
    const validateUser = await this.validationService.validate(
      UserValidation.FIND_BY_ID,
      id,
    );
    await this.userSerivce.delete(validateUser);
    return createBaseResponse(null);
  }
}
