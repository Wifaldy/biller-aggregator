import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base.repository';
import { PrismaService } from 'src/common/prisma.service';
import { RoleEntity } from 'src/entity/role.entity';
import { IRoleRepository } from './role.repository.interface';

@Injectable()
export class RoleRepository
  extends BaseRepository<RoleEntity>
  implements IRoleRepository
{
  constructor(private prismaService: PrismaService) {
    super(prismaService.roles, RoleEntity);
  }

  async findByName(name: string): Promise<RoleEntity | null> {
    const role = await this.prismaService.roles.findFirst({
      where: {
        name,
      },
    });
    if (!role) return null;

    return RoleEntity.fromPrisma(role);
  }

  async checkRoleReferences(id: number): Promise<boolean> {
    const findRoleReferences = await this.prismaService.roles.findFirst({
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
