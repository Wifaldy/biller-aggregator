import { BaseRepository } from 'src/common/base.repository';
import { IRoleEntity } from 'src/model/role.model';
import { IRoleRepository } from './role.repository.interface';
import { PrismaService } from 'src/common/prisma.service';
import { Injectable } from '@nestjs/common';

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
