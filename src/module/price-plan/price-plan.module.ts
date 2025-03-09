import { Module } from '@nestjs/common';
import { PricePlanService } from './price-plan.service';
import { PricePlanController } from './price-plan.controller';
import { IRepository } from 'src/common/repository.types';
import { PricePlanRepository } from './price-plan.repository';

@Module({
  controllers: [PricePlanController],
  providers: [
    PricePlanService,
    {
      provide: IRepository.IPricePlanRepository,
      useClass: PricePlanRepository,
    },
  ],
  exports: [PricePlanService],
})
export class PricePlanModule {}
