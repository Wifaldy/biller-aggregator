import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { IRepository } from 'src/common/repository.types';
import { ProductRepository } from './product.repository';
import { ProductTypeModule } from '../product-type/product-type.module';
import { OperatorModule } from '../operator/operator.module';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: IRepository.IProductRepository,
      useClass: ProductRepository,
    },
  ],
  imports: [ProductTypeModule, OperatorModule],
  exports: [ProductService],
})
export class ProductModule {}
