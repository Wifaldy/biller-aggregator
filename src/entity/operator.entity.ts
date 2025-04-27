import { PrefixOperatorEntity } from './prefix-operator.entity';
import { ProductEntity } from './product.entity';

export class OperatorEntity {
  id: number;
  name: string;
  minDigit: number;
  maxDigit: number;
  createdAt?: Date;
  updatedAt?: Date;
  products?: ProductEntity[];
  prefixOperators?: PrefixOperatorEntity[];

  constructor(
    id: number,
    name: string,
    minDigit: number,
    maxDigit: number,
    createdAt?: Date,
    updatedAt?: Date,
    products?: ProductEntity[],
    prefixOperators?: PrefixOperatorEntity[],
  ) {
    this.id = id;
    this.name = name;
    this.minDigit = minDigit;
    this.maxDigit = maxDigit;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.products = products;
    this.prefixOperators = prefixOperators;
  }

  // Static method to map Prisma data to domain entity
  static fromPrisma(prismaData: any): OperatorEntity {
    return new OperatorEntity(
      prismaData.id,
      prismaData.name,
      prismaData.min_digit,
      prismaData.max_digit,
      prismaData.created_at,
      prismaData.updated_at,
      prismaData.products &&
        prismaData.products.map((product: ProductEntity) =>
          ProductEntity.fromPrisma(product),
        ),
      prismaData.prefix_operators &&
        prismaData.prefix_operators.map(
          (prefixOperator: PrefixOperatorEntity) =>
            PrefixOperatorEntity.fromPrisma(prefixOperator),
        ),
    );
  }

  static toPrisma(props: OperatorEntity): any {
    return {
      id: props.id,
      name: props.name,
      min_digit: props.minDigit,
      max_digit: props.maxDigit,
      created_at: props.createdAt,
      updated_at: props.updatedAt,
    };
  }
}
