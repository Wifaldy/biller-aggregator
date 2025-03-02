import { Operator as OperatorPrisma } from '@prisma/client';
import { IPrefixOperatorEntity } from './prefix-operator.model';
import { IProductEntity } from './product.model';

export interface IOperatorEntity extends OperatorPrisma {
  prefixOperators?: IPrefixOperatorEntity[];
  products?: IProductEntity[];
}
