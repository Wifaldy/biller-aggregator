import { Product as ProductPrisma } from '@prisma/client';
import { IProductTypeEntity } from './product-type.model';

export interface IProductEntity extends ProductPrisma {
  productType?: IProductTypeEntity;
}
