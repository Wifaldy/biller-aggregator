import { BaseValidation } from 'src/common/base.validation';
import { z } from 'zod';

export class PricePlanProductValidation extends BaseValidation {
  static readonly CREATE = z.object({
    pricePlanId: z.number().positive(),
    operatorId: z.number().positive(),
    productId: z.number().positive(),
    sellPrice: z.number().optional().default(0),
    margin: z.number().optional().default(0),
    isActive: z.boolean().optional().default(true),
  });

  static readonly UPDATE = z.object({
    id: z.number().positive(),
    sellPrice: z.number().optional(),
    margin: z.number().optional(),
    isActive: z.boolean().optional(),
  });
}
