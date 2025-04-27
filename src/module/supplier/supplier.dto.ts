import { SupplierEntity } from 'src/entity/supplier.entity';

export interface ISupplierCreate extends Pick<SupplierEntity, 'name'> {}

export interface ISupplierUpdate extends Partial<SupplierEntity> {}

export interface ISupplierResponse
  extends Pick<SupplierEntity, 'id' | 'name'> {}

export class SupplierDto {
  static toDto(props: SupplierEntity): ISupplierResponse {
    return {
      id: props.id,
      name: props.name,
    };
  }
}
