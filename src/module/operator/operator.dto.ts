import { IOperatorEntity } from 'src/model/operator.model';

export interface IOperatorCreate
  extends Pick<IOperatorEntity, 'name' | 'minDigit' | 'maxDigit'> {}

export interface IOperatorUpdate
  extends Pick<IOperatorEntity, 'id' | 'name' | 'minDigit' | 'maxDigit'> {}

export interface IOperatorResponse
  extends Pick<IOperatorEntity, 'id' | 'name' | 'minDigit' | 'maxDigit'> {}

export class OperatorDto {
  static toDto(props: IOperatorEntity): IOperatorResponse {
    return {
      id: props.id,
      name: props.name,
      minDigit: props.minDigit,
      maxDigit: props.maxDigit,
    };
  }
}
