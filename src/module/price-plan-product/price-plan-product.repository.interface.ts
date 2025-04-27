import { IBaseRepository } from 'src/common/base.repository.interface';
import { PricePlanProductEntity } from 'src/entity/price-plan-product.entity';

export interface IPricePlanProductRepository
  extends IBaseRepository<PricePlanProductEntity> {
  findAllBypricePlanId(pricePlanId: number): Promise<PricePlanProductEntity[]>;
}
