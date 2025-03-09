import { Operator as OperatorPrisma } from '@prisma/client';
import { IPrefixOperatorEntity } from './prefix-operator.entity';
import { IProductEntity } from './product.entity';

export interface IOperatorEntity extends OperatorPrisma {
  prefixOperators?: IPrefixOperatorEntity[];
  products?: IProductEntity[];
}
