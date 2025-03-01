import { IBaseRepository } from './base.repository.interface';

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  constructor(private model: any) {}

  async findAll(): Promise<T[]> {
    return await this.model.findMany();
  }

  async findById(id: number): Promise<T> {
    return await this.model.findUnique({ where: { id } });
  }

  async update(id: number, entity: Partial<T>): Promise<T> {
    return await this.model.update({
      where: { id },
      data: entity,
    });
  }

  async create(entity: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    return await this.model.create({
      data: entity,
    });
  }

  async delete(id: number): Promise<boolean> {
    return await this.model.delete({ where: { id } });
  }
}
