export class ProductTypeEntity {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(id: number, name: string, createdAt?: Date, updatedAt?: Date) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromPrisma(prismaData: any): ProductTypeEntity {
    return new ProductTypeEntity(
      prismaData.id,
      prismaData.name,
      prismaData.created_at,
      prismaData.updated_at,
    );
  }

  static toPrisma(props: ProductTypeEntity): any {
    return {
      id: props.id,
      name: props.name,
      created_at: props.createdAt,
      updated_at: props.updatedAt,
    };
  }
}
