export const jwtConstants = {
  secret:
    'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
  expired: '600s',
};

export enum BalanceType {
  DEPOSIT = 'DEPOSIT',
  SETTLEMENT = 'SETTLEMENT',
}
