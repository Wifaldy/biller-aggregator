import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUserRegister, IUserResponse, IUserUpdate, UserDto } from './user.dto';
import { IRepository } from 'src/common/repository.types';
import { UserRepository } from './user.repository';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(IRepository.IUserRepository) private userRepository: UserRepository,
    private roleService: RoleService,
  ) {}

  async findAll(): Promise<IUserResponse[]> {
    const datas = await this.userRepository.findAll();
    return datas.map((data) => UserDto.toDto(data));
  }

  async create(user: IUserRegister): Promise<IUserResponse> {
    const [findUsername, _] = await Promise.all([
      await this.userRepository.findByUsername(user.username),
      await this.roleService.findById(user.roleId),
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
      await this.findById(user.id),
      await this.roleService.findById(user.roleId),
    ]);
    const updatedUser = await this.userRepository.update(user.id, user);
    return UserDto.toDto(updatedUser);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.userRepository.delete(id);
  }
}
