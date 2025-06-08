import { IPaginationRequest } from 'src/common/pagination.interface';
import { UserEntity } from 'src/entity/user.entity';

export interface IUserRegister
  extends Pick<UserEntity, 'username' | 'name' | 'password' | 'roleId'> {}

export interface IUserUpdate extends Partial<UserEntity> {}

export interface IUserResponse
  extends Pick<UserEntity, 'username' | 'name' | 'id' | 'role'> {}

export interface IUserResponseWithRole
  extends Pick<UserEntity, 'username' | 'name' | 'id'> {
  roleId: number;
  roleName: string;
}

export interface IUserPaginationRequest extends IPaginationRequest {
  name?: string;
}

export class UserDto {
  static toDto(props: UserEntity): IUserResponse {
    return {
      id: props.id,
      name: props.name,
      username: props.username,
    };
  }

  static toDtoWithRole(props: UserEntity): IUserResponseWithRole {
    return {
      id: props.id,
      name: props.name,
      username: props.username,
      roleId: props.roleId,
      roleName: props.role?.name,
    };
  }
}
