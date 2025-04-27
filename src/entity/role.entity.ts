export class RoleEntity {
  id?: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(id: number, name: string, createdAt?: Date, updatedAt?: Date) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Static method to map Prisma data to domain entity
  static fromPrisma(prismaData: any): RoleEntity {
    return new RoleEntity(
      prismaData.id,
      prismaData.name,
      prismaData.created_at,
      prismaData.updated_at,
    );
  }

  static toPrisma(props: RoleEntity): any {
    return {
      id: props.id,
      name: props.name,
      created_at: props.createdAt,
      updated_at: props.updatedAt,
    };
  }
}
