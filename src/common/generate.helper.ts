import * as crypto from 'crypto';

export const generateRandomPasswordString = (length: number = 24): string => {
  return crypto.randomBytes(length).toString('hex');
};

export const generateRandomUsernameString = (length: number = 4): string => {
  return crypto.randomBytes(length).toString('hex').toUpperCase();
};

export const generateRandomPinString = (length: number = 3): string => {
  return crypto.randomBytes(length).toString('hex').toUpperCase();
};
