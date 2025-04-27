import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base.repository';
import { PrismaService } from 'src/common/prisma.service';
import { UserEntity } from 'src/entity/user.entity';
import { IUserRepository } from './user.repository.interface';

@Injectable()
export class UserRepository
  extends BaseRepository<UserEntity>
  implements IUserRepository
{
  constructor(private prismaService: PrismaService) {
    super(prismaService.users, UserEntity);
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    const user = await this.prismaService.users.findUnique({
      where: {
        username,
      },
    });
    return user && UserEntity.fromPrisma(user);
  }

  async findByIdWithRole(id: number): Promise<UserEntity | null> {
    const user = await this.prismaService.users.findUnique({
      where: {
        id,
      },
      include: {
        role: true,
      },
    });
    return user && UserEntity.fromPrisma(user);
  }
}
