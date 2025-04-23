import { BaseValidation } from 'src/common/base.validation';
import { z } from 'zod';

export class ProductSupplierValidation extends BaseValidation {
  static readonly CREATE = z.object({
    supplierId: z.number().positive(),
    code: z.string().min(1).max(20).trim().toUpperCase(),
    productId: z.number().positive(),
    isActive: z.boolean().optional().default(false),
    priority: z.number().optional().default(0),
    buyPrice: z.number().optional().default(0),
  });

  static readonly UPDATE = ProductSupplierValidation.CREATE.extend({
    id: z.number().positive(),
  });
}
