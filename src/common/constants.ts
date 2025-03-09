export const jwtConstants = {
  secret:
    'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
  expired: '600s',
};

export type BalanceType = 'DEPOSIT' | 'SETTLEMENT';

export enum BalanceTypeEnum {
  DEPOSIT = 'DEPOSIT',
  SETTLEMENT = 'SETTLEMENT',
}
