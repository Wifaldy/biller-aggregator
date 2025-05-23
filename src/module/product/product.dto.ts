import { formatTimeToUtc } from 'src/common/time.helper';
import { ProductEntity } from 'src/entity/product.entity';
import {
  IProductTypeResponse,
  ProductTypeDto,
} from '../product-type/product-type.dto';

export interface IProductResponse
  extends Pick<
    ProductEntity,
    'id' | 'name' | 'code' | 'description' | 'isProblem' | 'isEmpty'
  > {
  operationalTimeStart: string;
  operationalTimeEnd: string;
  productType?: IProductTypeResponse;
}

export interface IProductCreate
  extends Pick<
    ProductEntity,
    | 'name'
    | 'code'
    | 'description'
    | 'operationalTimeStart'
    | 'operationalTimeEnd'
    | 'isProblem'
    | 'isEmpty'
    | 'operatorId'
    | 'productTypeId'
  > {}

export interface IProductUpdate extends Partial<ProductEntity> {}

export class ProductDto {
  static toDto(props: ProductEntity): IProductResponse {
    const operationalTimeStart = formatTimeToUtc(props.operationalTimeStart);
    const operationalTimeEnd = formatTimeToUtc(props.operationalTimeEnd);
    return {
      id: props.id,
      code: props.code,
      name: props.name,
      description: props.description,
      isEmpty: props.isEmpty,
      isProblem: props.isProblem,
      operationalTimeStart,
      operationalTimeEnd,
    };
  }

  static toDtoWithProductType(props: ProductEntity): IProductResponse {
    const operationalTimeStart = formatTimeToUtc(props.operationalTimeStart);
    const operationalTimeEnd = formatTimeToUtc(props.operationalTimeEnd);
    return {
      id: props.id,
      code: props.code,
      name: props.name,
      description: props.description,
      isEmpty: props.isEmpty,
      isProblem: props.isProblem,
      operationalTimeStart,
      operationalTimeEnd,
      productType: ProductTypeDto.toDto(props.productType),
    };
  }
}
