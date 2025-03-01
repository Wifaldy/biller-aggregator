import { Module } from '@nestjs/common';
import { PrefixOperatorController } from './prefix-operator.controller';
import { PrefixOperatorService } from './prefix-operator.service';
import { IRepository } from 'src/common/repository.types';
import { PrefixOperatorRepository } from './prefix-operator.repository';

@Module({
  controllers: [PrefixOperatorController],
  providers: [
    PrefixOperatorService,
    {
      provide: IRepository.IPrefixOperatorRepository,
      useClass: PrefixOperatorRepository,
    },
  ],
})
export class PrefixOperatorModule {}
