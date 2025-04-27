import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base.repository';
import { PrismaService } from 'src/common/prisma.service';
import { ProductSupplierEntity } from 'src/entity/product-supplier.entity';
import { IProductSupplierRepository } from './product-supplier.repository.interface';

@Injectable()
export class ProductSupplierRepository
  extends BaseRepository<ProductSupplierEntity>
  implements IProductSupplierRepository
{
  constructor(prismaService: PrismaService) {
    super(prismaService.product_suppliers, ProductSupplierEntity);
  }
}
