import { BaseValidation } from 'src/common/base.validation';
import { BalanceTypeEnum } from 'src/common/constants';
import {
  generateRandomPasswordString,
  generateRandomPinString,
  generateRandomUsernameString,
} from 'src/common/generate.helper';
import { z } from 'zod';

export class PartnerValidation extends BaseValidation {
  static readonly CREATE = z.object({
    name: z.string().min(1).max(20).trim().toUpperCase(),
    address: z.string().min(1).max(100).trim(),
    phone: z.string().min(1).max(20).trim(),
    balance: z.number().optional().default(0),
    balanceType: z
      .enum([BalanceTypeEnum.DEPOSIT, BalanceTypeEnum.SETTLEMENT])
      .default(BalanceTypeEnum.DEPOSIT),
    email: z.string().email().min(1).max(50).trim(),
    isActive: z.boolean().optional().default(true),
    username: z.string().min(1).trim().default(generateRandomUsernameString()),
    password: z.string().min(1).trim().default(generateRandomPasswordString()),
    pin: z.string().min(1).trim().default(generateRandomPinString()),
    pricePlanId: z.number().positive(),
  });

  static readonly UPDATE = PartnerValidation.CREATE.extend({
    id: z.number().positive(),
  });

  static readonly TOP_UP = z.object({
    id: z.number().positive(),
    balance: z.number(),
  });
}
