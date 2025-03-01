import { BaseRepository } from 'src/common/base.repository';
import { IProductTypeEntity } from 'src/model/product-type.model';
import { IProductTypeRepository } from './product-type.repository.interface';
import { PrismaService } from 'src/common/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductTypeRepository
  extends BaseRepository<IProductTypeEntity>
  implements IProductTypeRepository
{
  constructor(prismaService: PrismaService) {
    super(prismaService.productType);
  }
}
