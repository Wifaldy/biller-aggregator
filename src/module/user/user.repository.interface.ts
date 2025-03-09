import { IBaseRepository } from 'src/common/base.repository.interface';
import { IUserEntity } from 'src/entity/user.entity';

export interface IUserRepository extends IBaseRepository<IUserEntity> {
  findByUsername(username: string): Promise<IUserEntity | null>;
  findByIdWithRole(id: number): Promise<IUserEntity | null>;
}
