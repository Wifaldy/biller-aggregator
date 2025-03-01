import { BaseValidation } from 'src/common/base.validation';
import { isNumberRegex } from 'src/common/regex.helper';
import { z } from 'zod';

export class PrefixOperatorValidation extends BaseValidation {
  static readonly CREATE = z.object({
    operatorId: z.number().positive(),
    prefix: z.string().regex(isNumberRegex, {
      message: 'Prefix must be number',
    }),
  });

  static readonly UPDATE = PrefixOperatorValidation.CREATE.extend({
    id: z.number().positive(),
  });
}
