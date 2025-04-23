import { ISupplierEntity } from 'src/entity/supplier.entity';

export interface ISupplierCreate extends Pick<ISupplierEntity, 'name'> {}

export interface ISupplierUpdate extends Partial<ISupplierEntity> {}

export interface ISupplierResponse
  extends Pick<ISupplierEntity, 'id' | 'name'> {}

export class SupplierDto {
  static toDto(props: ISupplierEntity): ISupplierResponse {
    return {
      id: props.id,
      name: props.name,
    };
  }
}
