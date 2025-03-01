import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IRepository } from 'src/common/repository.types';
import { ProductTypeRepository } from './product-type.repository';
import {
  IProductTypeCreate,
  IProductTypeResponse,
  ProductTypeDto,
} from './product-type.dto';

@Injectable()
export class ProductTypeService {
  constructor(
    @Inject(IRepository.IProductTypeRepository)
    private productTypeRepository: ProductTypeRepository,
  ) {}

  async findAll(): Promise<IProductTypeResponse[]> {
    const productTypes = await this.productTypeRepository.findAll();
    return productTypes.map((data) => ProductTypeDto.toDto(data));
  }

  async create(productType: IProductTypeCreate): Promise<IProductTypeResponse> {
    const createdProductType =
      await this.productTypeRepository.create(productType);
    return ProductTypeDto.toDto(createdProductType);
  }

  async findById(id: number): Promise<IProductTypeResponse> {
    const findProductType = await this.productTypeRepository.findById(id);
    if (!findProductType)
      throw new HttpException('Product Type not found', HttpStatus.NOT_FOUND);
    return findProductType;
  }
}
