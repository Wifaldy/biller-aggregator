import { IPricePlanProductEntity } from 'src/entity/price-plan-product.entity';

export interface IPricePlanProductResponse
  extends Pick<
    IPricePlanProductEntity,
    'id' | 'pricePlanId' | 'productId' | 'sellPrice' | 'margin' | 'isActive'
  > {}

export interface IPricePlanProductCreate
  extends Pick<
    IPricePlanProductEntity,
    'pricePlanId' | 'productId' | 'sellPrice' | 'margin' | 'isActive'
  > {}

export interface IPricePlanProductUpdate
  extends Partial<IPricePlanProductEntity> {}

export interface IListPricePlanWithProductsAndOperators {
  operatorId: number;
  operatorName: string;
  products: IProductWithPrice[];
}

export interface IProductWithPrice {
  pricePlanProductId: number;
  productId: number;
  name: string;
  sellPrice: number;
  margin: number;
  isActive: boolean;
}

export class PricePlanProductDto {
  static toDto(props: IPricePlanProductEntity): IPricePlanProductResponse {
    return {
      id: props.id,
      pricePlanId: props.pricePlanId,
      productId: props.productId,
      sellPrice: props.sellPrice,
      margin: props.margin,
      isActive: props.isActive,
    };
  }
  static toDtoWithProductsAndOperators(
    props: IPricePlanProductEntity[],
  ): IListPricePlanWithProductsAndOperators[] {
    const operators: IListPricePlanWithProductsAndOperators[] = [];
    for (const prop of props) {
      const findOnOperator = operators.find(
        (operator) => operator.operatorId === prop.product.operatorId,
      );
      if (!findOnOperator) {
        operators.push({
          operatorId: prop.product.operatorId,
          operatorName: prop.product.operator.name,
          products: [
            {
              pricePlanProductId: prop.id,
              productId: prop.productId,
              name: prop.product.name,
              sellPrice: prop.sellPrice,
              margin: prop.margin,
              isActive: prop.isActive,
            },
          ],
        });
      } else {
        findOnOperator.products.push({
          pricePlanProductId: prop.id,
          productId: prop.productId,
          name: prop.product.name,
          sellPrice: prop.sellPrice,
          margin: prop.margin,
          isActive: prop.isActive,
        });
      }
    }
    return operators;
  }
}
