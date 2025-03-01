import { ZodType, z } from 'zod';

export class BaseValidation {
  static readonly FIND_BY_ID: ZodType = z.number().positive();
}
