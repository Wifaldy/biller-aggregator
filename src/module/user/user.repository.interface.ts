import { IBaseRepository } from 'src/common/base.repository.interface';
import { UserEntity } from 'src/entity/user.entity';

export interface IUserRepository extends IBaseRepository<UserEntity> {
  findByUsername(username: string): Promise<UserEntity | null>;
  findByIdWithRole(id: number): Promise<UserEntity | null>;
}
