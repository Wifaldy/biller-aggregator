import { Module } from '@nestjs/common';
import { PricePlanProductService } from './price-plan-product.service';
import { PricePlanProductController } from './price-plan-product.controller';
import { PricePlanProductRepository } from './price-plan-product.repository';
import { IRepository } from 'src/common/repository.types';
import { ProductModule } from '../product/product.module';
import { PricePlanModule } from '../price-plan/price-plan.module';
import { OperatorModule } from '../operator/operator.module';

@Module({
  controllers: [PricePlanProductController],
  providers: [
    PricePlanProductService,
    {
      provide: IRepository.IPricePlanProductRepository,
      useClass: PricePlanProductRepository,
    },
  ],
  imports: [ProductModule, PricePlanModule, OperatorModule],
})
export class PricePlanProductModule {}
