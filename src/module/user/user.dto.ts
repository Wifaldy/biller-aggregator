import { IUserEntity } from 'src/entity/user.entity';

export interface IUserRegister
  extends Pick<IUserEntity, 'username' | 'name' | 'password' | 'roleId'> {}

export interface IUserUpdate
  extends Pick<IUserEntity, 'id' | 'name' | 'roleId'> {}

export interface IUserResponse
  extends Pick<IUserEntity, 'username' | 'name' | 'id' | 'role'> {}

export class UserDto {
  static toDto(props: IUserEntity): IUserResponse {
    return {
      id: props.id,
      name: props.name,
      username: props.username,
    };
  }

  static toDtoWithRole(props: IUserEntity): IUserResponse {
    return {
      id: props.id,
      name: props.name,
      username: props.username,
      role: props.role,
    };
  }
}
