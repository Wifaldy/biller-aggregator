import { IOperatorEntity } from 'src/model/operator.model';
import {
  IPrefixOperatorResponse,
  PrefixOperatorDto,
} from '../prefix-operator/prefix-operator.dto';
import { IProductResponse, ProductDto } from '../product/product.dto';

export interface IOperatorCreate
  extends Pick<IOperatorEntity, 'name' | 'minDigit' | 'maxDigit'> {}

export interface IOperatorUpdate
  extends Pick<IOperatorEntity, 'id' | 'name' | 'minDigit' | 'maxDigit'> {}

export interface IOperatorResponse
  extends Pick<IOperatorEntity, 'id' | 'name' | 'minDigit' | 'maxDigit'> {
  prefixOperators?: IPrefixOperatorResponse[];
  products?: IProductResponse[];
}

export class OperatorDto {
  static toDto(props: IOperatorEntity): IOperatorResponse {
    return {
      id: props.id,
      name: props.name,
      minDigit: props.minDigit,
      maxDigit: props.maxDigit,
    };
  }

  static toDtoWithPrefixOperators(props: IOperatorEntity): IOperatorResponse {
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

  static toDtoWithProducts(props: IOperatorEntity): IOperatorResponse {
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
