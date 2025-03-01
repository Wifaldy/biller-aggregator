import { IBaseRepository } from 'src/common/base.repository.interface';
import { IProductTypeEntity } from 'src/model/product-type.model';

export interface IProductTypeRepository
  extends IBaseRepository<IProductTypeEntity> {}
