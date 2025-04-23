import { Module } from '@nestjs/common';
import { IRepository } from 'src/common/repository.types';
import { SupplierRepository } from './supplier.repository';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';

@Module({
  providers: [
    SupplierService,
    {
      provide: IRepository.ISupplierRepository,
      useClass: SupplierRepository,
    },
  ],
  exports: [SupplierService],
  controllers: [SupplierController],
})
export class SupplierModule {}
