import { formatTimeToUtc } from 'src/common/time.helper';
import { IProductEntity } from 'src/model/product.model';

export interface IProductResponse
  extends Pick<
    IProductEntity,
    'id' | 'name' | 'code' | 'description' | 'isProblem' | 'isEmpty'
  > {
  operationalTimeStart: string;
  operationalTimeEnd: string;
}

export interface IProductCreate
  extends Pick<
    IProductEntity,
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

export interface IProductUpdate
  extends Pick<
    IProductEntity,
    | 'id'
    | 'code'
    | 'description'
    | 'isEmpty'
    | 'isProblem'
    | 'name'
    | 'operationalTimeEnd'
    | 'operationalTimeStart'
    | 'operatorId'
    | 'productTypeId'
  > {}

export class ProductDto {
  static toDto(props: IProductEntity): IProductResponse {
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
}
