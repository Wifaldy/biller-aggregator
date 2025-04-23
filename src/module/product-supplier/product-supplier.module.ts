import { Module } from '@nestjs/common';
import { IRepository } from 'src/common/repository.types';
import { ProductModule } from '../product/product.module';
import { SupplierModule } from '../supplier/supplier.module';
import { ProductSupplierController } from './product-supplier.controller';
import { ProductSupplierRepository } from './product-supplier.repository';
import { ProductSupplierService } from './product-supplier.service';

@Module({
  providers: [
    ProductSupplierService,
    {
      provide: IRepository.IProductSupplierRepository,
      useClass: ProductSupplierRepository,
    },
  ],
  controllers: [ProductSupplierController],
  imports: [SupplierModule, ProductModule],
})
export class ProductSupplierModule {}
