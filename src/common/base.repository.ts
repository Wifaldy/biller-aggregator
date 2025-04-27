import { Prisma } from '@prisma/client';
import { IBaseRepository } from './base.repository.interface';

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  constructor(
    private model: any,
    private entity: {
      toPrisma: (props: any) => any;
      fromPrisma: (prismaData: any) => T;
    },
  ) {}

  async findAll(): Promise<T[]> {
    const datas = await this.model.findMany();
    return datas.map((data: any) => this.entity.fromPrisma(data));
  }

  async findById(id: number): Promise<T> {
    const data = await this.model.findUnique({ where: { id } });
    return data && this.entity.fromPrisma(data);
  }

  async update(
    id: number,
    data: Partial<T>,
    tx?: Prisma.TransactionClient,
  ): Promise<T> {
    data = this.entity.toPrisma(data);
    const client = tx ?? this.model;
    const updated = await client.update({
      where: { id },
      data: data,
    });
    return this.entity.fromPrisma(updated);
  }

  async create(
    data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>,
    tx?: Prisma.TransactionClient,
  ): Promise<T> {
    data = this.entity.toPrisma(data);
    const client = tx ?? this.model;
    const result = await client.create({
      data: data,
    });
    return this.entity.fromPrisma(result);
  }

  async delete(id: number, tx?: Prisma.TransactionClient): Promise<boolean> {
    const client = tx ?? this.model;
    return await client.delete({ where: { id } });
  }
}
