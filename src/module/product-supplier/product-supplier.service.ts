import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IRepository } from 'src/common/repository.types';
import { ProductService } from '../product/product.service';
import { SupplierService } from '../supplier/supplier.service';
import {
  IProductSupplierCreate,
  IProductSupplierResponse,
  IProductSupplierUpdate,
  ProductSupplierDto,
} from './product-supplier.dto';
import { IProductSupplierRepository } from './product-supplier.repository.interface';

@Injectable()
export class ProductSupplierService {
  constructor(
    @Inject(IRepository.IProductSupplierRepository)
    private productSupplierRepository: IProductSupplierRepository,
    private supplierService: SupplierService,
    private productService: ProductService,
  ) {}

  async findAll(): Promise<IProductSupplierResponse[]> {
    const datas = await this.productSupplierRepository.findAll();
    return datas.map((data) => ProductSupplierDto.toDto(data));
  }

  async findById(id: number): Promise<IProductSupplierResponse> {
    const findProductSupplier =
      await this.productSupplierRepository.findById(id);
    if (!findProductSupplier)
      throw new HttpException(
        'Product Supplier not found',
        HttpStatus.NOT_FOUND,
      );
    return ProductSupplierDto.toDto(findProductSupplier);
  }

  async create(
    productSupplier: IProductSupplierCreate,
  ): Promise<IProductSupplierResponse> {
    await Promise.all([
      this.supplierService.findById(productSupplier.supplierId),
      this.productService.findById(productSupplier.productId),
    ]);
    const createdProductSupplier =
      await this.productSupplierRepository.create(productSupplier);
    return ProductSupplierDto.toDto(createdProductSupplier);
  }

  async update(
    productSupplier: IProductSupplierUpdate,
  ): Promise<IProductSupplierResponse> {
    await Promise.all([
      this.findById(productSupplier.id),
      this.productService.findById(productSupplier.productId),
      this.supplierService.findById(productSupplier.supplierId),
    ]);
    const updatedProductSupplier = await this.productSupplierRepository.update(
      productSupplier.id,
      productSupplier,
    );
    return ProductSupplierDto.toDto(updatedProductSupplier);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.productSupplierRepository.delete(id);
  }
}
