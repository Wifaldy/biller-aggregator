import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base.repository';
import { PrismaService } from 'src/common/prisma.service';
import { ISupplierEntity } from 'src/entity/supplier.entity';
import { ISupplierRepository } from './supplier.repository.interface';

@Injectable()
export class SupplierRepository
  extends BaseRepository<ISupplierEntity>
  implements ISupplierRepository
{
  constructor(private prismaService: PrismaService) {
    super(prismaService.supplier);
  }
  async checkRoleReferences(id: number): Promise<boolean> {
    const findSupplierReferences = await this.prismaService.supplier.findFirst({
      select: {
        productSupplier: {
          select: {
            id: true,
          },
        },
      },
      where: {
        id,
      },
    });
    let isReferences = false;
    if (findSupplierReferences.productSupplier.length > 0) {
      isReferences = true;
    }
    return isReferences;
  }
}
