import { PrefixOperatorEntity } from 'src/entity/prefix-operator.entity';

export interface IPrefixOperatorResponse
  extends Pick<PrefixOperatorEntity, 'id' | 'operatorId' | 'prefix'> {}

export interface IPrefixOperatorCreate
  extends Pick<PrefixOperatorEntity, 'operatorId' | 'prefix'> {}

export interface IPrefixOperatorUpdate extends Partial<PrefixOperatorEntity> {}

export class PrefixOperatorDto {
  static toDto(props: PrefixOperatorEntity): IPrefixOperatorResponse {
    return {
      id: props.id,
      operatorId: props.operatorId,
      prefix: props.prefix,
    };
  }
}
