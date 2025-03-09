import { IBaseRepository } from 'src/common/base.repository.interface';
import { IPricePlanProductEntity } from 'src/entity/price-plan-product.entity';

export interface IPricePlanProductRepository
  extends IBaseRepository<IPricePlanProductEntity> {
  findAllByPricePlanId(pricePlanId: number): Promise<IPricePlanProductEntity[]>;
}
