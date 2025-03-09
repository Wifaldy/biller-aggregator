import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base.repository';
import { PrismaService } from 'src/common/prisma.service';
import { IPartnerEntity } from 'src/entity/partner.entity';
import { IPartnerRepository } from './partner.repository.interface';

@Injectable()
export class PartnerRepository
  extends BaseRepository<IPartnerEntity>
  implements IPartnerRepository
{
  constructor(private prismaService: PrismaService) {
    super(prismaService.partner);
  }

  async findByEmail(email: string): Promise<IPartnerEntity> {
    const partner = await this.prismaService.partner.findUnique({
      where: {
        email,
      },
    });
    return partner;
  }
}
