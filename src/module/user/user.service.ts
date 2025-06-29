import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IPaginationResponse } from 'src/common/pagination.interface';
import { IRepository } from 'src/common/repository.types';
import { RoleService } from '../role/role.service';
import {
  IUserPaginationRequest,
  IUserRegister,
  IUserResponse,
  IUserUpdate,
  UserDto,
} from './user.dto';
import { IUserRepository } from './user.repository.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject(IRepository.IUserRepository)
    private userRepository: IUserRepository,
    private roleService: RoleService,
  ) {}

  async findAll(): Promise<IUserResponse[]> {
    const datas = await this.userRepository.findAll();
    return datas.map((data) => UserDto.toDtoWithRole(data));
  }

  async findAllWithPagination(
    query: IUserPaginationRequest,
  ): Promise<IPaginationResponse<IUserResponse>> {
    const { data, total } =
      await this.userRepository.findAllWithPagination(query);
    return {
      data: data.map((user) => UserDto.toDtoWithRole(user)),
      meta: {
        pageSize: query.limit,
        currentPage: query.page,
        totalItems: total,
        totalPages: Math.ceil(total / query.limit),
        nextPage:
          query.page < Math.ceil(total / query.limit) ? query.page + 1 : null,
        prevPage: query.page > 1 ? query.page - 1 : null,
      },
    };
  }

  async create(user: IUserRegister): Promise<IUserResponse> {
    const [findUsername, _] = await Promise.all([
      this.userRepository.findByUsername(user.username),
      this.roleService.findById(user.roleId),
    ]);
    if (findUsername) throw new HttpException('Username is already exist', 400);

    user.password = await bcrypt.hash(user.password, 12);

    const createdUser = await this.userRepository.create(user);
    return UserDto.toDto(createdUser);
  }

  async findById(id: number): Promise<IUserResponse> {
    const findUser = await this.userRepository.findById(id);
    if (!findUser)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return UserDto.toDto(findUser);
  }

  async findByIdWithRole(id: number): Promise<IUserResponse> {
    const findUser = await this.userRepository.findByIdWithRole(id);
    if (!findUser)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return UserDto.toDtoWithRole(findUser);
  }

  async update(user: IUserUpdate): Promise<IUserResponse> {
    const [, _] = await Promise.all([
      this.findById(user.id),
      this.roleService.findById(user.roleId),
    ]);
    const updatedUser = await this.userRepository.update(user.id, user);
    return UserDto.toDto(updatedUser);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.userRepository.delete(id);
  }
}
