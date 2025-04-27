import { IBaseRepository } from 'src/common/base.repository.interface';
import { RoleEntity } from 'src/entity/role.entity';

export interface IRoleRepository extends IBaseRepository<RoleEntity> {
  findByName(name: string): Promise<RoleEntity | null>;
  checkRoleReferences(id: number): Promise<boolean>;
}
