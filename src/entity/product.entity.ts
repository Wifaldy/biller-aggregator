import { Product as ProductPrisma } from '@prisma/client';
import { IOperatorEntity } from './operator.entity';
import { IPricePlanProductEntity } from './price-plan-product.entity';
import { IProductTypeEntity } from './product-type.entity';

export interface IProductEntity extends ProductPrisma {
  productType?: IProductTypeEntity;
  pricePlanProducts?: IPricePlanProductEntity[];
  pricePlanProduct?: IPricePlanProductEntity;
  operator?: IOperatorEntity;
}
