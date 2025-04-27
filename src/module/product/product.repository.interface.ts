import { IBaseRepository } from 'src/common/base.repository.interface';
import { ProductEntity } from 'src/entity/product.entity';

export interface IProductRepository extends IBaseRepository<ProductEntity> {
  findByCode(sku: string): Promise<ProductEntity>;
}
