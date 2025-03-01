import { IRoleEntity } from 'src/model/role.model';

export interface IRoleCreate extends Pick<IRoleEntity, 'name'> {}

export interface IRoleUpdate extends Pick<IRoleEntity, 'id' | 'name'> {}

export interface IRoleResponse extends Pick<IRoleEntity, 'id' | 'name'> {}

export class RoleDto {
  static toDto(props: IRoleEntity): IRoleResponse {
    return {
      id: props.id,
      name: props.name,
    };
  }
}
