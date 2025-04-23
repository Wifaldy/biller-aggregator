import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IRepository } from 'src/common/repository.types';
import {
  ISupplierCreate,
  ISupplierResponse,
  ISupplierUpdate,
  SupplierDto,
} from './supplier.dto';
import { ISupplierRepository } from './supplier.repository.interface';

@Injectable()
export class SupplierService {
  constructor(
    @Inject(IRepository.ISupplierRepository)
    private supplierRepository: ISupplierRepository,
  ) {}

  async findAll(): Promise<ISupplierResponse[]> {
    const datas = await this.supplierRepository.findAll();
    return datas.map((data) => SupplierDto.toDto(data));
  }

  async findById(id: number): Promise<ISupplierResponse> {
    const findSupplier = await this.supplierRepository.findById(id);
    if (!findSupplier)
      throw new HttpException('Supplier not found', HttpStatus.NOT_FOUND);
    return SupplierDto.toDto(findSupplier);
  }

  async create(supplier: ISupplierCreate): Promise<ISupplierResponse> {
    const createdSupplier = await this.supplierRepository.create(supplier);
    return SupplierDto.toDto(createdSupplier);
  }

  async update(supplier: ISupplierUpdate): Promise<ISupplierResponse> {
    await this.findById(supplier.id);
    const updatedSupplier = await this.supplierRepository.update(
      supplier.id,
      supplier,
    );
    return SupplierDto.toDto(updatedSupplier);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    const checkRoleReferences =
      await this.supplierRepository.checkRoleReferences(id);
    if (checkRoleReferences)
      throw new HttpException(
        'Supplier is still in used',
        HttpStatus.FORBIDDEN,
      );
    await this.supplierRepository.delete(id);
  }
}
