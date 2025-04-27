import { ProductSupplierEntity } from './product-supplier.entity';

export class SupplierEntity {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  productSuppliers?: ProductSupplierEntity[];

  constructor(
    id: number,
    name: string,
    createdAt?: Date,
    updatedAt?: Date,
    productSuppliers?: ProductSupplierEntity[],
  ) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.productSuppliers = productSuppliers;
  }

  static fromPrisma(prismaData: any): SupplierEntity {
    return new SupplierEntity(
      prismaData.id,
      prismaData.name,
      prismaData.created_at,
      prismaData.updated_at,
      prismaData.product_suppliers &&
        prismaData.product_suppliers.map(
          (productSupplier: ProductSupplierEntity) =>
            ProductSupplierEntity.fromPrisma(productSupplier),
        ),
    );
  }

  static toPrisma(props: SupplierEntity): any {
    return {
      id: props.id,
      name: props.name,
      created_at: props.createdAt,
      updated_at: props.updatedAt,
    };
  }
}
