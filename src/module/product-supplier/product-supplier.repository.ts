import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base.repository';
import { PrismaService } from 'src/common/prisma.service';
import { IProductSupplierEntity } from 'src/entity/product-supplier.entity';
import { IProductSupplierRepository } from './product-supplier.repository.interface';

@Injectable()
export class ProductSupplierRepository
  extends BaseRepository<IProductSupplierEntity>
  implements IProductSupplierRepository
{
  constructor(prismaService: PrismaService) {
    super(prismaService.productSupplier);
  }
}
