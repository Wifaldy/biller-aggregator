import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base.repository';
import { PrismaService } from 'src/common/prisma.service';
import { IPricePlanEntity } from 'src/entity/price-plan.entity';
import { IPricePlanRepository } from './price-plan.repository.interface';

@Injectable()
export class PricePlanRepository
  extends BaseRepository<IPricePlanEntity>
  implements IPricePlanRepository
{
  constructor(prismaService: PrismaService) {
    super(prismaService.pricePlan);
  }
}
