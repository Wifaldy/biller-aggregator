import { Module } from '@nestjs/common';
import { OperatorController } from './operator.controller';
import { OperatorService } from './operator.service';
import { IRepository } from 'src/common/repository.types';
import { OperatorRepository } from './operator.repository';

@Module({
  controllers: [OperatorController],
  providers: [
    OperatorService,
    {
      provide: IRepository.IOperatorRepository,
      useClass: OperatorRepository,
    },
  ],
  exports: [OperatorService],
})
export class OperatorModule {}
