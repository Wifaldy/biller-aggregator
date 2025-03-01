import { IBaseRepository } from 'src/common/base.repository.interface';
import { IUserEntity } from 'src/model/user.model';

export interface IUserRepository extends IBaseRepository<IUserEntity> {
  findByUsername(username: string): Promise<IUserEntity | null>;
  findByIdWithRole(id: number): Promise<IUserEntity | null>;
}
