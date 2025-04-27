import { PricePlanEntity } from './price-plan.entity';
import { ProductEntity } from './product.entity';

export class PricePlanProductEntity {
  id: number;
  pricePlanId: number;
  productId: number;
  sellPrice: number;
  margin: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  pricePlan?: PricePlanEntity;
  product?: ProductEntity;

  constructor(
    id: number,
    pricePlanId: number,
    productId: number,
    sellPrice: number,
    margin: number,
    isActive: boolean,
    createdAt?: Date,
    updatedAt?: Date,
    pricePlan?: PricePlanEntity,
    product?: ProductEntity,
  ) {
    this.id = id;
    this.pricePlanId = pricePlanId;
    this.productId = productId;
    this.sellPrice = sellPrice;
    this.margin = margin;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.pricePlan = pricePlan;
    this.product = product;
  }

  static fromPrisma(prismaData: any): PricePlanProductEntity {
    return new PricePlanProductEntity(
      prismaData.id,
      prismaData.price_plan_id,
      prismaData.product_id,
      prismaData.sell_price,
      prismaData.margin,
      prismaData.is_active,
      prismaData.created_at,
      prismaData.updated_at,
      prismaData.price_plan &&
        PricePlanEntity.fromPrisma(prismaData.price_plan),
      prismaData.product && ProductEntity.fromPrisma(prismaData.product),
    );
  }

  static toPrisma(props: PricePlanProductEntity): any {
    return {
      id: props.id,
      price_plan_id: props.pricePlanId,
      product_id: props.productId,
      sell_price: props.sellPrice,
      margin: props.margin,
      is_active: props.isActive,
      created_at: props.createdAt,
      updated_at: props.updatedAt,
    };
  }
}
