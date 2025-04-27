import { ProductSupplierEntity } from 'src/entity/product-supplier.entity';

export interface IProductSupplierCreate
  extends Pick<
    ProductSupplierEntity,
    'supplierId' | 'code' | 'productId' | 'isActive' | 'priority' | 'buyPrice'
  > {}

export interface IProductSupplierUpdate
  extends Partial<ProductSupplierEntity> {}

export interface IProductSupplierResponse
  extends Pick<
    ProductSupplierEntity,
    | 'id'
    | 'code'
    | 'priority'
    | 'isActive'
    | 'productId'
    | 'supplierId'
    | 'buyPrice'
  > {}

export class ProductSupplierDto {
  static toDto(props: ProductSupplierEntity): IProductSupplierResponse {
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
