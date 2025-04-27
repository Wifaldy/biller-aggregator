import { UserEntity } from 'src/entity/user.entity';

export interface IUserRegister
  extends Pick<UserEntity, 'username' | 'name' | 'password' | 'roleId'> {}

export interface IUserUpdate extends Partial<UserEntity> {}

export interface IUserResponse
  extends Pick<UserEntity, 'username' | 'name' | 'id' | 'role'> {}

export class UserDto {
  static toDto(props: UserEntity): IUserResponse {
    return {
      id: props.id,
      name: props.name,
      username: props.username,
    };
  }

  static toDtoWithRole(props: UserEntity): IUserResponse {
    return {
      id: props.id,
      name: props.name,
      username: props.username,
      role: props.role,
    };
  }
}
