import { PartnerEntity } from './partner.entity';
import { PricePlanProductEntity } from './price-plan-product.entity';

export class PricePlanEntity {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  pricePlansProducts?: PricePlanProductEntity[];
  partners?: PartnerEntity[];

  constructor(
    id: number,
    name: string,
    createdAt?: Date,
    updatedAt?: Date,
    pricePlansProducts?: PricePlanProductEntity[],
    partners?: PartnerEntity[],
  ) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.pricePlansProducts = pricePlansProducts;
    this.partners = partners;
  }

  static fromPrisma(prismaData: any): PricePlanEntity {
    return new PricePlanEntity(
      prismaData.id,
      prismaData.name,
      prismaData.created_at,
      prismaData.updated_at,
      prismaData.price_plan_products &&
        prismaData.price_plan_products.map(
          (pricePlanProduct: PricePlanProductEntity) =>
            PricePlanProductEntity.fromPrisma(pricePlanProduct),
        ),
      prismaData.partners &&
        prismaData.partners.map((partner: PartnerEntity) =>
          PartnerEntity.fromPrisma(partner),
        ),
    );
  }

  static toPrisma(props: PricePlanEntity): any {
    return {
      id: props.id,
      name: props.name,
      created_at: props.createdAt,
      updated_at: props.updatedAt,
    };
  }
}
