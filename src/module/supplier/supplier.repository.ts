import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base.repository';
import { PrismaService } from 'src/common/prisma.service';
import { SupplierEntity } from 'src/entity/supplier.entity';
import { ISupplierRepository } from './supplier.repository.interface';

@Injectable()
export class SupplierRepository
  extends BaseRepository<SupplierEntity>
  implements ISupplierRepository
{
  constructor(private prismaService: PrismaService) {
    super(prismaService.suppliers, SupplierEntity);
  }
  async checkRoleReferences(id: number): Promise<boolean> {
    const findSupplierReferences = await this.prismaService.suppliers.findFirst(
      {
        select: {
          product_suppliers: {
            select: {
              id: true,
            },
          },
        },
        where: {
          id,
        },
      },
    );

    let isReferences = false;
    if (findSupplierReferences.product_suppliers.length > 0) {
      isReferences = true;
    }
    return isReferences;
  }
}
