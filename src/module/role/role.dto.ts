import { IRoleEntity } from 'src/entity/role.entity';

export interface IRoleCreate extends Pick<IRoleEntity, 'name'> {}

export interface IRoleUpdate extends Partial<IRoleEntity> {}

export interface IRoleResponse extends Pick<IRoleEntity, 'id' | 'name'> {}

export class RoleDto {
  static toDto(props: IRoleEntity): IRoleResponse {
    return {
      id: props.id,
      name: props.name,
    };
  }
}
