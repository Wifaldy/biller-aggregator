import { IBaseRepository } from 'src/common/base.repository.interface';
import { IProductEntity } from 'src/entity/product.entity';

export interface IProductRepository extends IBaseRepository<IProductEntity> {
  findByCode(sku: string): Promise<IProductEntity>;
}
