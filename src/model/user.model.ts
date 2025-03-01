import { User as UserPrisma } from '@prisma/client';
import { IRoleEntity } from './role.model';

export interface IUserEntity extends UserPrisma {
  role?: IRoleEntity;
}
