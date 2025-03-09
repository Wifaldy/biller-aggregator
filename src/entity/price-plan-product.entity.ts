import { PricePlanProduct as PricePlanProductPrisma } from '@prisma/client';
import { IOperatorEntity } from './operator.entity';
import { IPricePlanEntity } from './price-plan.entity';
import { IProductEntity } from './product.entity';

export interface IPricePlanProductEntity extends PricePlanProductPrisma {
  operator?: IOperatorEntity;
  product?: IProductEntity;
  pricePlan?: IPricePlanEntity;
}
