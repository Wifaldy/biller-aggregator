import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IRepository } from 'src/common/repository.types';
import {
  IProductCreate,
  IProductResponse,
  IProductUpdate,
  ProductDto,
} from './product.dto';
import { ProductTypeService } from '../product-type/product-type.service';
import { OperatorService } from '../operator/operator.service';
import { IProductRepository } from './product.repository.interface';

@Injectable()
export class ProductService {
  constructor(
    @Inject(IRepository.IProductRepository)
    private productRepository: IProductRepository,
    private productTypeService: ProductTypeService,
    private operatorService: OperatorService,
  ) {}

  async findAll(): Promise<IProductResponse[]> {
    const products = await this.productRepository.findAll();
    return products.map((data) => ProductDto.toDto(data));
  }

  async create(product: IProductCreate): Promise<IProductResponse> {
    await Promise.all([
      await this.productTypeService.findById(product.productTypeId),
      await this.operatorService.findById(product.operatorId),
    ]);

    const findBySku = await this.productRepository.findByCode(product.code);
    if (findBySku)
      throw new HttpException(
        'Product code is already exists',
        HttpStatus.CONFLICT,
      );

    const createdProduct = await this.productRepository.create(product);
    return ProductDto.toDto(createdProduct);
  }

  async findById(id: number): Promise<IProductResponse> {
    const product = await this.productRepository.findById(id);
    if (!product)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    return ProductDto.toDto(product);
  }

  async update(product: IProductUpdate): Promise<IProductResponse> {
    await Promise.all([
      await this.findById(product.id),
      await this.productTypeService.findById(product.productTypeId),
      await this.operatorService.findById(product.operatorId),
    ]);

    const findBySku = await this.productRepository.findByCode(product.code);
    if (findBySku && findBySku.id !== product.id)
      throw new HttpException(
        'Product code is already exists',
        HttpStatus.CONFLICT,
      );

    const createdProduct = await this.productRepository.update(
      product.id,
      product,
    );
    return ProductDto.toDto(createdProduct);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.productRepository.delete(id);
  }
}
