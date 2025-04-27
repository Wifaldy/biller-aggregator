import { RoleEntity } from 'src/entity/role.entity';

export interface IRoleCreate extends Pick<RoleEntity, 'name'> {}

export interface IRoleUpdate extends Partial<RoleEntity> {}

export interface IRoleResponse extends Pick<RoleEntity, 'id' | 'name'> {}

export class RoleDto {
  static toDto(props: RoleEntity): IRoleResponse {
    return {
      id: props.id,
      name: props.name,
    };
  }
}
