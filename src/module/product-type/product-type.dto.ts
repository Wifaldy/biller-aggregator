import { IProductTypeEntity } from 'src/entity/product-type.entity';

export interface IProductTypeCreate extends Pick<IProductTypeEntity, 'name'> {}

export interface IProductTypeResponse
  extends Pick<IProductTypeEntity, 'name' | 'id'> {}

export class ProductTypeDto {
  static toDto(props: IProductTypeEntity): IProductTypeResponse {
    return {
      id: props.id,
      name: props.name,
    };
  }
}
