import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base.repository';
import { PrismaService } from 'src/common/prisma.service';
import { IPricePlanProductEntity } from 'src/entity/price-plan-product.entity';
import { IPricePlanProductRepository } from './price-plan-product.repository.interface';

@Injectable()
export class PricePlanProductRepository
  extends BaseRepository<IPricePlanProductEntity>
  implements IPricePlanProductRepository
{
  constructor(private prismaService: PrismaService) {
    super(prismaService.pricePlanProduct);
  }

  async findAllByPricePlanId(
    pricePlanId: number,
  ): Promise<IPricePlanProductEntity[]> {
    const pricePlanProducts =
      await this.prismaService.pricePlanProduct.findMany({
        where: {
          pricePlanId,
        },
        include: {
          product: {
            include: {
              operator: true,
            },
          },
        },
      });
    return pricePlanProducts;
  }
}
