import { IPrefixOperatorEntity } from 'src/entity/prefix-operator.entity';

export interface IPrefixOperatorResponse
  extends Pick<IPrefixOperatorEntity, 'id' | 'operatorId' | 'prefix'> {}

export interface IPrefixOperatorCreate
  extends Pick<IPrefixOperatorEntity, 'operatorId' | 'prefix'> {}

export interface IPrefixOperatorUpdate extends Partial<IPrefixOperatorEntity> {}

export class PrefixOperatorDto {
  static toDto(props: IPrefixOperatorEntity): IPrefixOperatorResponse {
    return {
      id: props.id,
      operatorId: props.operatorId,
      prefix: props.prefix,
    };
  }
}
