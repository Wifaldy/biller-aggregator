import { BaseRepository } from 'src/common/base.repository';
import { IPrefixOperatorEntity } from 'src/model/prefix-operator.model';
import { IPrefixOPeratorRepositoryInterface } from './prefix-operator.repository.interface';
import { PrismaService } from 'src/common/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrefixOperatorRepository
  extends BaseRepository<IPrefixOperatorEntity>
  implements IPrefixOPeratorRepositoryInterface
{
  constructor(prismaService: PrismaService) {
    super(prismaService.prefixOperator);
  }
}
