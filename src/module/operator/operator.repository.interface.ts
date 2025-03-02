import { IBaseRepository } from 'src/common/base.repository.interface';
import { IOperatorEntity } from 'src/model/operator.model';

export interface IOperatorRepository extends IBaseRepository<IOperatorEntity> {
  checkOperatorReferences(id: number): Promise<boolean>;
  findOperatorWithPrefixOperators(id: number): Promise<IOperatorEntity>;
  findAllOperatorWithProducts(): Promise<IOperatorEntity[]>;
}
