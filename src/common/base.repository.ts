import { Prisma } from '@prisma/client';
import { IBaseRepository } from './base.repository.interface';

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  constructor(private model: any) {}

  async findAll(): Promise<T[]> {
    return await this.model.findMany();
  }

  async findById(id: number): Promise<T> {
    return await this.model.findUnique({ where: { id } });
  }

  async update(
    id: number,
    entity: Partial<T>,
    tx?: Prisma.TransactionClient,
  ): Promise<T> {
    const client = tx ?? this.model;
    return await client.update({
      where: { id },
      data: entity,
    });
  }

  async create(
    entity: Omit<T, 'id' | 'createdAt' | 'updatedAt'>,
    tx?: Prisma.TransactionClient,
  ): Promise<T> {
    const client = tx ?? this.model;
    return await client.create({
      data: entity,
    });
  }

  async delete(id: number, tx?: Prisma.TransactionClient): Promise<boolean> {
    const client = tx ?? this.model;
    return await client.delete({ where: { id } });
  }
}
