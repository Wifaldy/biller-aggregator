import { BaseRepository } from 'src/common/base.repository';
import { IUserEntity } from 'src/model/user.model';
import { IUserRepository } from './user.repository.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class UserRepository
  extends BaseRepository<IUserEntity>
  implements IUserRepository
{
  constructor(private prismaService: PrismaService) {
    super(prismaService.user);
  }

  async findByUsername(username: string): Promise<IUserEntity | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });
    return user;
  }

  async findByIdWithRole(id: number): Promise<IUserEntity | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        role: true,
      },
    });
    return user;
  }
}
