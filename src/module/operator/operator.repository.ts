import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base.repository';
import { IOperatorEntity } from 'src/model/operator.model';
import { IOperatorRepository } from './operator.repository.interface';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class OperatorRepository
  extends BaseRepository<IOperatorEntity>
  implements IOperatorRepository
{
  constructor(private prismaService: PrismaService) {
    super(prismaService.operator);
  }

  async checkOperatorReferences(id: number): Promise<boolean> {
    const findOperatorReferences = await this.prismaService.operator.findFirst({
      select: {
        prefixOperators: {
          select: {
            id: true,
          },
        },
        products: {
          select: {
            id: true,
          },
        },
      },
      where: {
        id,
      },
    });
    let references = false;
    if (
      findOperatorReferences.prefixOperators.length > 0 ||
      findOperatorReferences.products.length > 0
    ) {
      references = true;
    }
    return references;
  }

  async findOperatorWithPrefixOperators(id: number): Promise<IOperatorEntity> {
    const operatorWithPrefixOperator =
      await this.prismaService.operator.findUnique({
        where: {
          id,
        },
        include: {
          prefixOperators: true,
        },
      });
    return operatorWithPrefixOperator;
  }

  async findAllOperatorWithProducts(): Promise<IOperatorEntity[]> {
    const operatorsWithProducts = await this.prismaService.operator.findMany({
      include: {
        prefixOperators: true,
        products: {
          include: {
            productType: true,
          },
        },
      },
    });
    return operatorsWithProducts;
  }
}
