import { Module } from '@nestjs/common';
import { IRepository } from 'src/common/repository.types';
import { OperatorModule } from '../operator/operator.module';
import { PrefixOperatorController } from './prefix-operator.controller';
import { PrefixOperatorRepository } from './prefix-operator.repository';
import { PrefixOperatorService } from './prefix-operator.service';

@Module({
  controllers: [PrefixOperatorController],
  providers: [
    PrefixOperatorService,
    {
      provide: IRepository.IPrefixOperatorRepository,
      useClass: PrefixOperatorRepository,
    },
  ],
  imports: [OperatorModule],
})
export class PrefixOperatorModule {}
