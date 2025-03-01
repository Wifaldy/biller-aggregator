import { BaseValidation } from 'src/common/base.validation';
import { z } from 'zod';

export class UserValidation extends BaseValidation {
  static readonly REGISTER = z.object({
    username: z.string().min(1).max(100).trim(),
    name: z.string().min(1).max(100).trim(),
    password: z.string().min(1).max(100).trim(),
    roleId: z.number(),
  });

  static readonly UPDATE = UserValidation.REGISTER.omit({
    username: true,
    password: true,
  }).extend({
    id: z.number(),
  });
}
