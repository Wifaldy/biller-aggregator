import { BaseValidation } from 'src/common/base.validation';
import { z } from 'zod';

export class AuthValidation extends BaseValidation {
  static readonly LOGIN = z.object({
    username: z.string().min(1).max(100).trim(),
    password: z.string().min(1).max(100).trim(),
  });
}
