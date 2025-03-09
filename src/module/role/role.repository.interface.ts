import { IBaseRepository } from 'src/common/base.repository.interface';
import { IRoleEntity } from 'src/entity/role.entity';

export interface IRoleRepository extends IBaseRepository<IRoleEntity> {
  findByName(name: string): Promise<IRoleEntity | null>;
  checkRoleReferences(id: number): Promise<boolean>;
}
