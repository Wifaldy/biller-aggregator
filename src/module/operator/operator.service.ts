import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IRepository } from 'src/common/repository.types';
import {
  IOperatorCreate,
  IOperatorResponse,
  IOperatorUpdate,
  OperatorDto,
} from './operator.dto';
import { IOperatorRepository } from './operator.repository.interface';

@Injectable()
export class OperatorService {
  constructor(
    @Inject(IRepository.IOperatorRepository)
    private operatorRepository: IOperatorRepository,
  ) {}

  async findAll(): Promise<IOperatorResponse[]> {
    const operators = await this.operatorRepository.findAll();
    return operators.map((operator) => OperatorDto.toDto(operator));
  }

  async findAllWithPrefixOperators(id: number): Promise<IOperatorResponse> {
    await this.findById(id);
    const operator =
      await this.operatorRepository.findAllWithPrefixOperators(id);
    return OperatorDto.toDtoWithPrefixOperators(operator);
  }

  async findAllOperatorsWithProducts(): Promise<IOperatorResponse[]> {
    const operators = await this.operatorRepository.findAllWithProducts();
    return operators.map((operator) => OperatorDto.toDtoWithProducts(operator));
  }

  async create(operator: IOperatorCreate): Promise<IOperatorResponse> {
    const createdOperator = await this.operatorRepository.create(operator);
    return OperatorDto.toDto(createdOperator);
  }

  async findById(id: number): Promise<IOperatorResponse> {
    const findOperator = await this.operatorRepository.findById(id);
    if (!findOperator)
      throw new HttpException('Operator not found', HttpStatus.NOT_FOUND);
    return OperatorDto.toDto(findOperator);
  }

  async update(operator: IOperatorUpdate): Promise<IOperatorResponse> {
    await this.findById(operator.id);
    const updatedOperator = await this.operatorRepository.update(
      operator.id,
      operator,
    );
    return OperatorDto.toDto(updatedOperator);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.operatorRepository.delete(id);
  }
}
