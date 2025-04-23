import { IProductSupplierEntity } from 'src/entity/product-supplier.entity';

export interface IProductSupplierCreate
  extends Pick<
    IProductSupplierEntity,
    'supplierId' | 'code' | 'productId' | 'isActive' | 'priority' | 'buyPrice'
  > {}

export interface IProductSupplierUpdate
  extends Partial<IProductSupplierEntity> {}

export interface IProductSupplierResponse
  extends Pick<
    IProductSupplierEntity,
    | 'id'
    | 'code'
    | 'priority'
    | 'isActive'
    | 'productId'
    | 'supplierId'
    | 'buyPrice'
  > {}

export class ProductSupplierDto {
  static toDto(props: IProductSupplierEntity): IProductSupplierResponse {
    return {
      id: props.id,
      code: props.code,
      priority: props.priority,
      isActive: props.isActive,
      productId: props.productId,
      supplierId: props.supplierId,
      buyPrice: props.buyPrice,
    };
  }
}
