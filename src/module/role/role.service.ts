import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IRoleCreate, IRoleResponse, IRoleUpdate, RoleDto } from './role.dto';
import { IRepository } from 'src/common/repository.types';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(
    @Inject(IRepository.IRoleRepository) private roleRepository: RoleRepository,
  ) {}

  async findAll(): Promise<IRoleResponse[]> {
    const datas = await this.roleRepository.findAll();
    return datas.map((data) => RoleDto.toDto(data));
  }

  async findById(id: number): Promise<IRoleResponse> {
    const findRole = await this.roleRepository.findById(id);
    if (!findRole)
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    return RoleDto.toDto(findRole);
  }

  async create(role: IRoleCreate): Promise<IRoleResponse> {
    const findRole = await this.roleRepository.findByName(role.name);
    if (findRole)
      throw new HttpException(
        'Role name is already exists',
        HttpStatus.BAD_REQUEST,
      );
    const createdRole = await this.roleRepository.create(role);
    return RoleDto.toDto(createdRole);
  }

  async update(role: IRoleUpdate): Promise<IRoleResponse> {
    await this.findById(role.id);
    const updatedRole = await this.roleRepository.update(role.id, role);
    return RoleDto.toDto(updatedRole);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    const checkRoleReferences =
      await this.roleRepository.checkRoleReferences(id);
    if (checkRoleReferences)
      throw new HttpException('Role is still in used', HttpStatus.FORBIDDEN);
    await this.roleRepository.delete(id);
  }
}
