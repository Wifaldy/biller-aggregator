import { Module } from '@nestjs/common';
import { IRepository } from 'src/common/repository.types';
import { PricePlanModule } from '../price-plan/price-plan.module';
import { PartnerController } from './partner.controller';
import { PartnerRepository } from './partner.repository';
import { PartnerService } from './partner.service';

@Module({
  controllers: [PartnerController],
  providers: [
    PartnerService,
    {
      provide: IRepository.IPartnerRepository,
      useClass: PartnerRepository,
    },
  ],
  imports: [PricePlanModule],
})
export class PartnerModule {}
