import { Module } from '@nestjs/common';
import { ProductTypeController } from './product-type.controller';
import { ProductTypeService } from './product-type.service';
import { IRepository } from 'src/common/repository.types';
import { ProductTypeRepository } from './product-type.repository';

@Module({
  controllers: [ProductTypeController],
  providers: [
    ProductTypeService,
    {
      provide: IRepository.IProductTypeRepository,
      useClass: ProductTypeRepository,
    },
  ],
  exports: [ProductTypeService],
})
export class ProductTypeModule {}
