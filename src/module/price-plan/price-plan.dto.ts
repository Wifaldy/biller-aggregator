import { PricePlanEntity } from 'src/entity/price-plan.entity';

export interface IPricePlanResponse
  extends Pick<PricePlanEntity, 'id' | 'name'> {}

export interface IPricePlanCreate extends Pick<PricePlanEntity, 'name'> {}
export interface IPricePlanUpdate extends Partial<PricePlanEntity> {}

export class PricePlanDto {
  static toDto(props: PricePlanEntity): IPricePlanResponse {
    return {
      id: props.id,
      name: props.name,
    };
  }
}
