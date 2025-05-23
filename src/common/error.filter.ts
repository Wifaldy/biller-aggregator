import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JsonWebTokenError } from '@nestjs/jwt';
import { ZodError } from 'zod';
import { CustomLoggerService } from './logger.service';

interface ErrorResponse {
  message: string;
  status: number;
  errors?: { field: string; error: string }[];
}

@Catch()
export class ErrorFilter implements ExceptionFilter {
  constructor(private readonly logger: CustomLoggerService) {}

  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    this.logger.info(
      `${host.switchToHttp().getRequest().method} ${host.switchToHttp().getRequest().url}`,
      'Request URL',
    );

    this.logger.warn(exception);

    let errorResponse: ErrorResponse;

    if (exception instanceof ZodError) {
      errorResponse = {
        status: HttpStatus.BAD_REQUEST,
        message: 'Validation Error',
        errors: this.formatZodErrors(exception),
      };
      response.status(400).json(errorResponse);
    } else if (exception instanceof HttpException) {
      errorResponse = {
        status: exception.getStatus(),
        message: exception.message,
      };
      response.status(exception.getStatus()).json(errorResponse);
    } else if (exception instanceof JsonWebTokenError) {
      errorResponse = {
        status: HttpStatus.UNAUTHORIZED,
        message: exception.message,
      };
      response.status(401).json(errorResponse);
    } else {
      errorResponse = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
        errors: exception.message,
      };
      response.status(500).json(errorResponse);
    }
  }

  formatZodErrors(errors: ZodError): any[] {
    return errors.errors.map((err) => ({
      field: err.path.join(','),
      error: err.message,
    }));
  }
}
