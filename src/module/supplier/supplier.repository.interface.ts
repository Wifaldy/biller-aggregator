import { IBaseRepository } from 'src/common/base.repository.interface';
import { ISupplierEntity } from 'src/entity/supplier.entity';

export interface ISupplierRepository extends IBaseRepository<ISupplierEntity> {
  checkRoleReferences(id: number): Promise<boolean>;
}
