import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base.repository';
import { PrismaService } from 'src/common/prisma.service';
import { ProductEntity } from 'src/entity/product.entity';
import { IProductRepository } from './product.repository.interface';

@Injectable()
export class ProductRepository
  extends BaseRepository<ProductEntity>
  implements IProductRepository
{
  constructor(private prismaService: PrismaService) {
    super(prismaService.products, ProductEntity);
  }

  async findByCode(sku: string): Promise<ProductEntity> {
    const product = await this.prismaService.products.findFirst({
      where: {
        code: sku,
      },
    });
    return product && ProductEntity.fromPrisma(product);
  }
}
