import { IBaseRepository } from 'src/common/base.repository.interface';
import { IOperatorEntity } from 'src/entity/operator.entity';

export interface IOperatorRepository extends IBaseRepository<IOperatorEntity> {
  checkOperatorReferences(id: number): Promise<boolean>;
  findAllWithPrefixOperators(id: number): Promise<IOperatorEntity>;
  findAllWithProducts(): Promise<IOperatorEntity[]>;
}
