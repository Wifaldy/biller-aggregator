import { IBaseRepository } from 'src/common/base.repository.interface';
import { IPricePlanEntity } from 'src/entity/price-plan.entity';

export interface IPricePlanRepository
  extends IBaseRepository<IPricePlanEntity> {}
