import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base.repository';
import { PrismaService } from 'src/common/prisma.service';
import { PricePlanProductEntity } from 'src/entity/price-plan-product.entity';
import { IPricePlanProductRepository } from './price-plan-product.repository.interface';

@Injectable()
export class PricePlanProductRepository
  extends BaseRepository<PricePlanProductEntity>
  implements IPricePlanProductRepository
{
  constructor(private prismaService: PrismaService) {
    super(prismaService.price_plan_products, PricePlanProductEntity);
  }

  async findAllBypricePlanId(
    pricePlanId: number,
  ): Promise<PricePlanProductEntity[]> {
    const pricePlanProducts =
      await this.prismaService.price_plan_products.findMany({
        where: {
          price_plan_id: pricePlanId,
        },
        include: {
          product: {
            include: {
              operator: true,
            },
          },
        },
      });
    return pricePlanProducts.map((pricePlanProduct) =>
      PricePlanProductEntity.fromPrisma(pricePlanProduct),
    );
  }
}
