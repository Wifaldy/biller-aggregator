import { IBaseRepository } from 'src/common/base.repository.interface';
import { OperatorEntity } from 'src/entity/operator.entity';

export interface IOperatorRepository extends IBaseRepository<OperatorEntity> {
  checkOperatorReferences(id: number): Promise<boolean>;
  findAllWithPrefixOperators(id: number): Promise<OperatorEntity>;
  findAllWithProducts(): Promise<OperatorEntity[]>;
}
