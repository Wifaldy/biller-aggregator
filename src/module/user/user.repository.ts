import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base.repository';
import { PrismaService } from 'src/common/prisma.service';
import { UserEntity } from 'src/entity/user.entity';
import { IUserPaginationRequest } from './user.dto';
import { IUserRepository } from './user.repository.interface';

@Injectable()
export class UserRepository
  extends BaseRepository<UserEntity>
  implements IUserRepository
{
  constructor(private prismaService: PrismaService) {
    super(prismaService.users, UserEntity);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prismaService.users.findMany({
      include: {
        role: true,
      },
    });
    return users && users.map((user) => UserEntity.fromPrisma(user));
  }

  async findAllWithPagination(
    props: IUserPaginationRequest,
  ): Promise<{ data: UserEntity[]; total: number }> {
    const users = await this.prismaService.users.findMany({
      skip: (props.page - 1) * props.limit,
      take: props.limit,
      include: {
        role: true,
      },
      where: props.name
        ? {
            OR: [
              {
                name: {
                  contains: props.name,
                  mode: 'insensitive',
                },
              },
              {
                username: {
                  contains: props.name,
                  mode: 'insensitive',
                },
              },
              {
                role: {
                  is: {
                    name: {
                      contains: props.name,
                      mode: 'insensitive',
                    },
                  },
                },
              },
            ],
          }
        : undefined,
    });

    const totalItems = await this.prismaService.users.count();

    return {
      data: users && users.map((user) => UserEntity.fromPrisma(user)),
      total: totalItems,
    };
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
