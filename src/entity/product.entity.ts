import { OperatorEntity } from './operator.entity';
import { ProductTypeEntity } from './product-type.entity';

export class ProductEntity {
  id: number;
  name: string;
  description: string;
  code: string;
  operationalTimeStart: Date;
  operationalTimeEnd: Date;
  isProblem: boolean;
  isEmpty: boolean;
  operatorId: number;
  productTypeId: number;
  createdAt?: Date;
  updatedAt?: Date;
  operator?: OperatorEntity;
  productType?: ProductTypeEntity;

  constructor(
    id: number,
    name: string,
    description: string,
    code: string,
    operationalTimeStart: Date,
    operationalTimeEnd: Date,
    isProblem: boolean,
    isEmpty: boolean,
    operatorId: number,
    productTypeId: number,
    createdAt?: Date,
    updatedAt?: Date,
    operator?: OperatorEntity,
    productType?: ProductTypeEntity,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.code = code;
    this.operationalTimeStart = operationalTimeStart;
    this.operationalTimeEnd = operationalTimeEnd;
    this.isProblem = isProblem;
    this.isEmpty = isEmpty;
    this.operatorId = operatorId;
    this.productTypeId = productTypeId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.operator = operator;
    this.productType = productType;
  }

  // Static method to map Prisma data to domain entity
  static fromPrisma(prismaData: any): ProductEntity {
    return new ProductEntity(
      prismaData.id,
      prismaData.name,
      prismaData.description,
      prismaData.code,
      prismaData.operational_time_start,
      prismaData.operational_time_end,
      prismaData.is_problem,
      prismaData.is_empty,
      prismaData.operator_id,
      prismaData.product_type_id,
      prismaData.created_at,
      prismaData.updated_at,
      prismaData.operator && OperatorEntity.fromPrisma(prismaData.operator),
      prismaData.product_type &&
        ProductTypeEntity.fromPrisma(prismaData.product_type),
    );
  }

  static toPrisma(props: ProductEntity): any {
    return {
      id: props.id,
      name: props.name,
      description: props.description,
      code: props.code,
      operational_time_start: props.operationalTimeStart,
      operational_time_end: props.operationalTimeEnd,
      is_problem: props.isProblem,
      is_empty: props.isEmpty,
      operator_id: props.operatorId,
      product_type_id: props.productTypeId,
      created_at: props.createdAt,
      updated_at: props.updatedAt,
    };
  }
}
