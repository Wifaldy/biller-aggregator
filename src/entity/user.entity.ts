import { RoleEntity } from './role.entity';

export class UserEntity {
  id: number;
  username: string;
  name: string;
  password: string;
  roleId: number;
  createdAt?: Date;
  updatedAt?: Date;
  role?: RoleEntity;

  constructor(
    id: number,
    username: string,
    name: string,
    password: string,
    roleId: number,
    createdAt?: Date,
    updatedAt?: Date,
    role?: RoleEntity,
  ) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.password = password;
    this.roleId = roleId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.role = role;
  }

  // Static method to map Prisma data to domain entity
  static fromPrisma(prismaData: any): UserEntity {
    return new UserEntity(
      prismaData.id,
      prismaData.username,
      prismaData.name,
      prismaData.password,
      prismaData.role_id,
      prismaData.created_at,
      prismaData.updated_at,
      prismaData.role && RoleEntity.fromPrisma(prismaData.role),
    );
  }

  static toPrisma(props: UserEntity): any {
    return {
      id: props.id,
      username: props.username,
      name: props.name,
      password: props.password,
      role_id: props.roleId,
      created_at: props.createdAt,
      updated_at: props.updatedAt,
    };
  }
}
