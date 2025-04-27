export interface IEntity {
  id?: number;
  createdAt?: Date;
  updateAt?: Date;
  new (...args: any[]): IEntity;
  toPrisma(props: IEntity): any;
}
