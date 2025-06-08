import { IBaseRepository } from 'src/common/base.repository.interface';
import { UserEntity } from 'src/entity/user.entity';
import { IUserPaginationRequest } from './user.dto';

export interface IUserRepository extends IBaseRepository<UserEntity> {
  findByUsername(username: string): Promise<UserEntity | null>;
  findByIdWithRole(id: number): Promise<UserEntity | null>;
  findAllWithPagination(
    props: IUserPaginationRequest,
  ): Promise<{ data: UserEntity[]; total: number }>;
}
