import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IRepository } from 'src/common/repository.types';
import {
  IListPricePlanWithProductsAndOperators,
  IPricePlanProductCreate,
  IPricePlanProductResponse,
  IPricePlanProductUpdate,
  PricePlanProductDto,
} from './price-plan-product.dto';
import { PricePlanService } from '../price-plan/price-plan.service';
import { ProductService } from '../product/product.service';
import { IPricePlanProductRepository } from './price-plan-product.repository.interface';

@Injectable()
export class PricePlanProductService {
  constructor(
    @Inject(IRepository.IPricePlanProductRepository)
    private readonly pricePlanProductRepository: IPricePlanProductRepository,
    private pricePlanService: PricePlanService,
    private productService: ProductService,
  ) {}

  async findAllByPricePlanId(
    pricePlanId: number,
  ): Promise<IListPricePlanWithProductsAndOperators[]> {
    await this.pricePlanService.findById(pricePlanId);
    const pricePlanProducts =
      await this.pricePlanProductRepository.findAllByPricePlanId(pricePlanId);
    return PricePlanProductDto.toDtoWithProductsAndOperators(pricePlanProducts);
  }

  async create(
    pricePlanProduct: IPricePlanProductCreate,
  ): Promise<IPricePlanProductResponse> {
    await Promise.all([
      await this.pricePlanService.findById(pricePlanProduct.pricePlanId),
      await this.productService.findById(pricePlanProduct.productId),
    ]);

    const createdPricePlanProduct =
      await this.pricePlanProductRepository.create(pricePlanProduct);
    return PricePlanProductDto.toDto(createdPricePlanProduct);
  }

  async findById(id: number): Promise<IPricePlanProductResponse> {
    const pricePlanProduct = await this.pricePlanProductRepository.findById(id);
    if (!pricePlanProduct)
      throw new HttpException(
        'Price plan product not found',
        HttpStatus.NOT_FOUND,
      );
    return PricePlanProductDto.toDto(pricePlanProduct);
  }

  async update(
    pricePlanProduct: IPricePlanProductUpdate,
  ): Promise<IPricePlanProductResponse> {
    await this.findById(pricePlanProduct.id);

    const updatedPricePlanProduct =
      await this.pricePlanProductRepository.update(
        pricePlanProduct.id,
        pricePlanProduct,
      );
    return PricePlanProductDto.toDto(updatedPricePlanProduct);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.pricePlanProductRepository.delete(id);
  }
}
