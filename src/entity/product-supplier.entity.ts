import { ProductEntity } from './product.entity';
import { SupplierEntity } from './supplier.entity';

export class ProductSupplierEntity {
  id: number;
  supplierId: number;
  code: string;
  productId: number;
  isActive: boolean;
  priority: number;
  buyPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
  supplier?: SupplierEntity;
  product?: ProductEntity;

  constructor(
    id: number,
    supplierId: number,
    code: string,
    productId: number,
    isActive: boolean,
    priority: number,
    buyPrice: number,
    createdAt?: Date,
    updatedAt?: Date,
    supplier?: SupplierEntity,
    product?: ProductEntity,
  ) {
    this.id = id;
    this.supplierId = supplierId;
    this.code = code;
    this.productId = productId;
    this.isActive = isActive;
    this.priority = priority;
    this.buyPrice = buyPrice;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.supplier = supplier;
    this.product = product;
  }

  static fromPrisma(prismaData: any): ProductSupplierEntity {
    return new ProductSupplierEntity(
      prismaData.id,
      prismaData.supplier_id,
      prismaData.code,
      prismaData.product_id,
      prismaData.is_active,
      prismaData.priority,
      prismaData.buyPrice,
      prismaData.created_at,
      prismaData.updated_at,
      prismaData.supplier && SupplierEntity.fromPrisma(prismaData.supplier),
      prismaData.product && ProductEntity.fromPrisma(prismaData.product),
    );
  }

  static toPrisma(props: ProductSupplierEntity): any {
    return {
      id: props.id,
      supplier_id: props.supplierId,
      code: props.code,
      product_id: props.productId,
      is_active: props.isActive,
      priority: props.priority,
      buy_price: props.buyPrice,
      created_at: props.createdAt,
      updated_at: props.updatedAt,
    };
  }
}
