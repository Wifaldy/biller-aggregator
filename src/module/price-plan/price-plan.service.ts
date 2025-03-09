import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IRepository } from 'src/common/repository.types';
import {
  IPricePlanCreate,
  IPricePlanResponse,
  IPricePlanUpdate,
  PricePlanDto,
} from './price-plan.dto';
import { IPricePlanRepository } from './price-plan.repository.interface';

@Injectable()
export class PricePlanService {
  constructor(
    @Inject(IRepository.IPricePlanRepository)
    private pricePlanRepository: IPricePlanRepository,
  ) {}

  async findAll(): Promise<IPricePlanResponse[]> {
    const pricePlans = await this.pricePlanRepository.findAll();
    return pricePlans.map((pricePlan) => PricePlanDto.toDto(pricePlan));
  }

  async findById(id: number): Promise<IPricePlanResponse> {
    const pricePlan = await this.pricePlanRepository.findById(id);
    if (!pricePlan)
      throw new HttpException('Price plan not found', HttpStatus.NOT_FOUND);
    return PricePlanDto.toDto(pricePlan);
  }

  async create(pricePlan: IPricePlanCreate): Promise<IPricePlanResponse> {
    const createdPricePlan = await this.pricePlanRepository.create(pricePlan);
    return PricePlanDto.toDto(createdPricePlan);
  }

  async update(pricePlan: IPricePlanUpdate): Promise<IPricePlanResponse> {
    await this.findById(pricePlan.id);

    const updatedPricePlan = await this.pricePlanRepository.update(
      pricePlan.id,
      pricePlan,
    );
    return PricePlanDto.toDto(updatedPricePlan);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.pricePlanRepository.delete(id);
  }
}
