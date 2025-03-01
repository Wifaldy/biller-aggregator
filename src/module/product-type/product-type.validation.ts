import { BaseValidation } from 'src/common/base.validation';
import { z } from 'zod';

export class ProductTypeValidation extends BaseValidation {
  static readonly CREATE = z.object({
    name: z.string().min(1).max(20).trim().toUpperCase(),
  });
}
