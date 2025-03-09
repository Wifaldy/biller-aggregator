import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base.repository';
import { PrismaService } from 'src/common/prisma.service';
import { IProductEntity } from 'src/entity/product.entity';
import { IProductRepository } from './product.repository.interface';

@Injectable()
export class ProductRepository
  extends BaseRepository<IProductEntity>
  implements IProductRepository
{
  constructor(private prismaService: PrismaService) {
    super(prismaService.product);
  }

  async findByCode(sku: string): Promise<IProductEntity> {
    const product = await this.prismaService.product.findFirst({
      where: {
        code: sku,
      },
    });
    return product;
  }
}
