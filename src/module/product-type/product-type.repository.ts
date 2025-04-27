import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base.repository';
import { PrismaService } from 'src/common/prisma.service';
import { ProductTypeEntity } from 'src/entity/product-type.entity';
import { IProductTypeRepository } from './product-type.repository.interface';

@Injectable()
export class ProductTypeRepository
  extends BaseRepository<ProductTypeEntity>
  implements IProductTypeRepository
{
  constructor(prismaService: PrismaService) {
    super(prismaService.product_types, ProductTypeEntity);
  }
}
