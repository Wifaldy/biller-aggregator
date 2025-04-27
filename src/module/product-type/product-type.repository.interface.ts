import { IBaseRepository } from 'src/common/base.repository.interface';
import { ProductTypeEntity } from 'src/entity/product-type.entity';

export interface IProductTypeRepository
  extends IBaseRepository<ProductTypeEntity> {}
