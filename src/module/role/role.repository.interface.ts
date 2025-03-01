import { IBaseRepository } from 'src/common/base.repository.interface';
import { IRoleEntity } from 'src/model/role.model';

export interface IRoleRepository extends IBaseRepository<IRoleEntity> {
  findByName(name: string): Promise<IRoleEntity | null>;
  checkRoleReferences(id: number): Promise<boolean>;
}
