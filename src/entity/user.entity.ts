import { User as UserPrisma } from '@prisma/client';
import { IRoleEntity } from './role.entity';

export interface IUserEntity extends UserPrisma {
  role?: IRoleEntity;
}
