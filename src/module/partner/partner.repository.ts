import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base.repository';
import { PrismaService } from 'src/common/prisma.service';
import { PartnerEntity } from 'src/entity/partner.entity';
import { IPartnerRepository } from './partner.repository.interface';

@Injectable()
export class PartnerRepository
  extends BaseRepository<PartnerEntity>
  implements IPartnerRepository
{
  constructor(private prismaService: PrismaService) {
    super(prismaService.partners, PartnerEntity);
  }

  async findByEmail(email: string): Promise<PartnerEntity> {
    const partner = await this.prismaService.partners.findUnique({
      where: {
        email,
      },
    });
    return partner && PartnerEntity.fromPrisma(partner);
  }
}
