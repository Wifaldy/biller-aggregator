import { ZodType, z } from 'zod';

export class BaseValidation {
  static readonly FIND_BY_ID: ZodType = z.number().positive();

  static readonly FIND_ALL_WITH_PAGINATION = z.object({
    page: z.number().optional().default(0),
    limit: z.number().optional().default(0),
  });
}
