import { IPricePlanEntity } from 'src/entity/price-plan.entity';

export interface IPricePlanResponse
  extends Pick<IPricePlanEntity, 'id' | 'name'> {}

export interface IPricePlanCreate extends Pick<IPricePlanEntity, 'name'> {}
export interface IPricePlanUpdate
  extends Pick<IPricePlanEntity, 'id' | 'name'> {}

export class PricePlanDto {
  static toDto(props: IPricePlanEntity): IPricePlanResponse {
    return {
      id: props.id,
      name: props.name,
    };
  }
}
