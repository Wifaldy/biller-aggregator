import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base.repository';
import { PrismaService } from 'src/common/prisma.service';
import { IRoleEntity } from 'src/entity/role.entity';
import { IRoleRepository } from './role.repository.interface';

@Injectable()
export class RoleRepository
  extends BaseRepository<IRoleEntity>
  implements IRoleRepository
{
  constructor(private prismaService: PrismaService) {
    super(prismaService.role);
  }

  async findByName(name: string): Promise<IRoleEntity | null> {
    return await this.prismaService.role.findFirst({
      where: {
        name,
      },
    });
  }

  async checkRoleReferences(id: number): Promise<boolean> {
    const findRoleReferences = await this.prismaService.role.findFirst({
      select: {
        users: {
          select: {
            id: true,
          },
        },
      },
      where: {
        id,
      },
    });
    let isReferences = false;
    if (findRoleReferences.users.length > 0) {
      isReferences = true;
    }

    return isReferences;
  }
}
