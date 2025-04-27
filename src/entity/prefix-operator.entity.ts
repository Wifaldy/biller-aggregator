import { OperatorEntity } from './operator.entity';

export class PrefixOperatorEntity {
  id: number;
  operatorId: number;
  prefix: string;
  createdAt?: Date;
  updatedAt?: Date;
  operator?: OperatorEntity;

  constructor(
    id: number,
    operatorId: number,
    prefix: string,
    createdAt?: Date,
    updatedAt?: Date,
    operator?: OperatorEntity,
  ) {
    this.id = id;
    this.operatorId = operatorId;
    this.prefix = prefix;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.operator = operator;
  }

  // Static method to map Prisma data to domain entity
  static fromPrisma(prismaData: any): PrefixOperatorEntity {
    return new PrefixOperatorEntity(
      prismaData.id,
      prismaData.operator_id,
      prismaData.prefix,
      prismaData.created_at,
      prismaData.updated_at,
      prismaData.operator && OperatorEntity.fromPrisma(prismaData.operator),
    );
  }

  static toPrisma(props: PrefixOperatorEntity): any {
    return {
      id: props.id,
      operator_id: props.operatorId,
      prefix: props.prefix,
      created_at: props.createdAt,
      updated_at: props.updatedAt,
    };
  }
}
