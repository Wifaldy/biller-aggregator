import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base.repository';
import { PrismaService } from 'src/common/prisma.service';
import { PrefixOperatorEntity } from 'src/entity/prefix-operator.entity';
import { IPrefixOPeratorRepositoryInterface } from './prefix-operator.repository.interface';

@Injectable()
export class PrefixOperatorRepository
  extends BaseRepository<PrefixOperatorEntity>
  implements IPrefixOPeratorRepositoryInterface
{
  constructor(prismaService: PrismaService) {
    super(prismaService.prefix_operators, PrefixOperatorEntity);
  }
}
