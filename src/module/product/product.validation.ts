import { BaseValidation } from 'src/common/base.validation';
import { validateStartTimeAndEndTime } from 'src/common/time.helper';
import { z } from 'zod';

const ProductBaseScheme = z.object({
  name: z.string().min(1).max(20).trim().toUpperCase(),
  operatorId: z.number().positive(),
  productTypeId: z.number().positive(),
  description: z.string().min(1).max(100).trim(),
  code: z.string().min(1).max(100).trim().toUpperCase(),
  operationalTimeStart: z.string().time(),
  operationalTimeEnd: z.string().time(),
  isEmpty: z.boolean().default(false),
  isProblem: z.boolean().default(false),
});

const validateOperationalTimes = (data: z.infer<typeof ProductBaseScheme>) => {
  return validateStartTimeAndEndTime(
    data.operationalTimeStart,
    data.operationalTimeEnd,
  );
};

const validateOperationalTimesOptions = {
  message: 'operationalTimeEnd must be greater than operationalTimeStart',
  path: ['operationalTimeEnd'],
};

export class ProductValidation extends BaseValidation {
  static readonly CREATE = ProductBaseScheme.refine(
    validateOperationalTimes,
    validateOperationalTimesOptions,
  );
  static readonly UPDATE = ProductBaseScheme.extend({
    id: z.number().positive(),
  }).refine(validateOperationalTimes, validateOperationalTimesOptions);
}
