import { IBaseRepository } from 'src/common/base.repository.interface';
import { IProductSupplierEntity } from 'src/entity/product-supplier.entity';

export interface IProductSupplierRepository
  extends IBaseRepository<IProductSupplierEntity> {}
