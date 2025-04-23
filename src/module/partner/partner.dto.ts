import { IPartnerEntity } from 'src/entity/partner.entity';

export interface IPartnerCreate
  extends Pick<
    IPartnerEntity,
    | 'name'
    | 'address'
    | 'balance'
    | 'balanceType'
    | 'email'
    | 'isActive'
    | 'password'
    | 'phone'
    | 'pin'
    | 'pricePlanId'
    | 'username'
    | 'urlCallback'
  > {}

export interface IPartnerUpdate extends Partial<IPartnerEntity> {}

export interface IPartnerResponse extends Partial<IPartnerEntity> {}

export interface IPartnerResetCredentials {
  username: string;
  password: string;
  pin: string;
}

export class PartnerDto {
  static toDto(props: IPartnerEntity): IPartnerResponse {
    return {
      id: props.id,
      address: props.address,
      balance: props.balance,
      balanceType: props.balanceType,
      email: props.email,
      isActive: props.isActive,
      name: props.name,
      password: props.password,
      phone: props.phone,
      pin: props.pin,
      username: props.username,
      pricePlanId: props.pricePlanId,
    };
  }

  static toDtoList(props: IPartnerEntity): IPartnerResponse {
    return {
      id: props.id,
      name: props.name,
      address: props.address,
      balance: props.balance,
      pricePlanId: props.pricePlanId,
    };
  }
}
