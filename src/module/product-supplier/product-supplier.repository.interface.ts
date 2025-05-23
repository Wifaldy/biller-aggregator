import { IBaseRepository } from 'src/common/base.repository.interface';
import { ProductSupplierEntity } from 'src/entity/product-supplier.entity';

export interface IProductSupplierRepository
  extends IBaseRepository<ProductSupplierEntity> {}
