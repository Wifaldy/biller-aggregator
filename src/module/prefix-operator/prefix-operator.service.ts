import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IRepository } from 'src/common/repository.types';
import { PrefixOperatorRepository } from './prefix-operator.repository';
import {
  IPrefixOperatorCreate,
  IPrefixOperatorResponse,
  PrefixOperatorDto,
} from './prefix-operator.dto';

@Injectable()
export class PrefixOperatorService {
  constructor(
    @Inject(IRepository.IPrefixOperatorRepository)
    private prefixOperatorRepository: PrefixOperatorRepository,
  ) {}

  async create(
    prefixOperator: IPrefixOperatorCreate,
  ): Promise<IPrefixOperatorResponse> {
    const createdPrefixOperator =
      await this.prefixOperatorRepository.create(prefixOperator);
    return PrefixOperatorDto.toDto(createdPrefixOperator);
  }

  async delete(id: number): Promise<void> {
    const findPrefixOperator = await this.prefixOperatorRepository.findById(id);
    if (!findPrefixOperator)
      throw new HttpException(
        'Prefix Operator not found',
        HttpStatus.NOT_FOUND,
      );
    await this.prefixOperatorRepository.delete(id);
  }
}
