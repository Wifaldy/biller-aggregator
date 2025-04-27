import { OperatorEntity } from 'src/entity/operator.entity';
import {
  IPrefixOperatorResponse,
  PrefixOperatorDto,
} from '../prefix-operator/prefix-operator.dto';
import { IProductResponse, ProductDto } from '../product/product.dto';

export interface IOperatorCreate
  extends Pick<OperatorEntity, 'name' | 'minDigit' | 'maxDigit'> {}

export interface IOperatorUpdate extends Partial<OperatorEntity> {}

export interface IOperatorResponse
  extends Pick<OperatorEntity, 'id' | 'name' | 'minDigit' | 'maxDigit'> {
  prefixOperators?: IPrefixOperatorResponse[];
  products?: IProductResponse[];
}

export class OperatorDto {
  static toDto(props: OperatorEntity): IOperatorResponse {
    return {
      id: props.id,
      name: props.name,
      minDigit: props.minDigit,
      maxDigit: props.maxDigit,
    };
  }

  static toDtoWithPrefixOperators(props: OperatorEntity): IOperatorResponse {
    return {
      id: props.id,
      name: props.name,
      minDigit: props.minDigit,
      maxDigit: props.maxDigit,
      prefixOperators: props.prefixOperators.map((prefixOperator) =>
        PrefixOperatorDto.toDto(prefixOperator),
      ),
    };
  }

  static toDtoWithProducts(props: OperatorEntity): IOperatorResponse {
    return {
      id: props.id,
      name: props.name,
      minDigit: props.minDigit,
      maxDigit: props.maxDigit,
      products: props.products.map((product) =>
        ProductDto.toDtoWithProductType(product),
      ),
    };
  }
}
