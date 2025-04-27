import { PricePlanEntity } from './price-plan.entity';

export class PartnerEntity {
  id: number;
  pricePlanId: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  balanceType: string;
  balance: number;
  isActive: boolean;
  username: string;
  password: string;
  pin: string;
  urlCallback?: string;
  createdAt?: Date;
  updatedAt?: Date;
  pricePlan?: PricePlanEntity;

  constructor(
    id: number,
    pricePlanId: number,
    name: string,
    email: string,
    phone: string,
    address: string,
    balanceType: string,
    balance: number,
    isActive: boolean,
    username: string,
    password: string,
    pin: string,
    updatedAt?: Date,
    createdAt?: Date,
    urlCallback?: string,
    pricePlan?: PricePlanEntity,
  ) {
    this.id = id;
    this.pricePlanId = pricePlanId;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.balanceType = balanceType;
    this.balance = balance;
    this.isActive = isActive;
    this.username = username;
    this.password = password;
    this.pin = pin;
    this.urlCallback = urlCallback;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.pricePlan = pricePlan;
  }

  static fromPrisma(prismaData: any): PartnerEntity {
    return new PartnerEntity(
      prismaData.id,
      prismaData.price_plan_id,
      prismaData.name,
      prismaData.email,
      prismaData.phone,
      prismaData.address,
      prismaData.balance_type,
      prismaData.balance,
      prismaData.is_active,
      prismaData.username,
      prismaData.password,
      prismaData.pin,
      prismaData.url_callback,
      prismaData.created_at,
      prismaData.updated_at,
      prismaData.price_plan &&
        PricePlanEntity.fromPrisma(prismaData.price_plan),
    );
  }

  static toPrisma(props: PartnerEntity): any {
    return {
      id: props.id,
      price_plan_id: props.pricePlanId,
      name: props.name,
      email: props.email,
      phone: props.phone,
      address: props.address,
      balance_type: props.balanceType,
      balance: props.balance,
      is_active: props.isActive,
      username: props.username,
      password: props.password,
      pin: props.pin,
      url_callback: props.urlCallback,
      created_at: props.createdAt,
      updated_at: props.updatedAt,
    };
  }
}
