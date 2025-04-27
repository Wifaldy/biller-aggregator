import { IBaseRepository } from 'src/common/base.repository.interface';
import { SupplierEntity } from 'src/entity/supplier.entity';

export interface ISupplierRepository extends IBaseRepository<SupplierEntity> {
  checkRoleReferences(id: number): Promise<boolean>;
}
