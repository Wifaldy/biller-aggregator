import { ProductTypeEntity } from 'src/entity/product-type.entity';

export interface IProductTypeCreate extends Pick<ProductTypeEntity, 'name'> {}

export interface IProductTypeResponse extends Partial<ProductTypeEntity> {}

export class ProductTypeDto {
  static toDto(props: ProductTypeEntity): IProductTypeResponse {
    return {
      id: props.id,
      name: props.name,
    };
  }
}
