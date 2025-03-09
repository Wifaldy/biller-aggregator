import { IBaseRepository } from 'src/common/base.repository.interface';
import { IProductTypeEntity } from 'src/entity/product-type.entity';

export interface IProductTypeRepository
  extends IBaseRepository<IProductTypeEntity> {}
