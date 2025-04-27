import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base.repository';
import { PrismaService } from 'src/common/prisma.service';
import { OperatorEntity } from 'src/entity/operator.entity';
import { IOperatorRepository } from './operator.repository.interface';

@Injectable()
export class OperatorRepository
  extends BaseRepository<OperatorEntity>
  implements IOperatorRepository
{
  constructor(private prismaService: PrismaService) {
    super(prismaService.operators, OperatorEntity);
  }

  async checkOperatorReferences(id: number): Promise<boolean> {
    const findOperatorReferences = await OperatorEntity.fromPrisma(
      this.prismaService.operators.findFirst({
        select: {
          prefix_operators: {
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
      }),
    );
    let references = false;
    if (
      findOperatorReferences.prefixOperators.length > 0 ||
      findOperatorReferences.products.length > 0
    ) {
      references = true;
    }
    return references;
  }

  async findAllWithPrefixOperators(id: number): Promise<OperatorEntity> {
    const operatorWithPrefixOperator =
      await this.prismaService.operators.findUnique({
        where: {
          id,
        },
        include: {
          prefix_operators: true,
        },
      });
    return OperatorEntity.fromPrisma(operatorWithPrefixOperator);
  }

  async findAllWithProducts(): Promise<OperatorEntity[]> {
    const operatorsWithProducts = await this.prismaService.operators.findMany({
      include: {
        prefix_operators: true,
        products: {
          include: {
            product_type: true,
          },
        },
      },
    });
    return operatorsWithProducts.map((operator) =>
      OperatorEntity.fromPrisma(operator),
    );
  }
}
