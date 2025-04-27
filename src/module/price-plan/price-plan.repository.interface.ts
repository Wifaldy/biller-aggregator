import { IBaseRepository } from 'src/common/base.repository.interface';
import { PricePlanEntity } from 'src/entity/price-plan.entity';

export interface IPricePlanRepository
  extends IBaseRepository<PricePlanEntity> {}
