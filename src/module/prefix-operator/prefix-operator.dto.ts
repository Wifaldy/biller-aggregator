import { IPrefixOperatorEntity } from 'src/model/prefix-operator.model';

export interface IPrefixOperatorResponse
  extends Pick<IPrefixOperatorEntity, 'id' | 'operatorId' | 'prefix'> {}

export interface IPrefixOperatorCreate
  extends Pick<IPrefixOperatorEntity, 'operatorId' | 'prefix'> {}

export interface IPrefixOperatorUpdate
  extends Pick<IPrefixOperatorEntity, 'id' | 'prefix' | 'operatorId'> {}

export class PrefixOperatorDto {
  static toDto(props: IPrefixOperatorEntity): IPrefixOperatorResponse {
    return {
      id: props.id,
      operatorId: props.operatorId,
      prefix: props.prefix,
    };
  }
}
