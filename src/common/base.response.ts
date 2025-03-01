import { HttpStatus } from '@nestjs/common';

export interface BaseResponse<T> {
  status: number;
  message: string;
  data?: T;
}

export function createBaseResponse<T>(
  data: T,
  message: string = 'Success',
  status: number = HttpStatus.OK,
): BaseResponse<T> {
  return {
    status,
    message,
    data,
  };
}
