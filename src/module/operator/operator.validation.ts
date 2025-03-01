import { BaseValidation } from 'src/common/base.validation';
import { z } from 'zod';

export class OperatorValidation extends BaseValidation {
  static readonly CREATE = z.object({
    name: z.string().min(1).max(100).trim().toUpperCase(),
    minDigit: z.number().min(1).max(100).optional().default(8),
    maxDigit: z.number().min(1).max(100).optional().default(20),
  });

  static readonly UPDATE = OperatorValidation.CREATE.extend({
    id: z.number(),
  });
}
