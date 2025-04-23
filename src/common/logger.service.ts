import { Injectable, LoggerService } from '@nestjs/common';
import * as moment from 'moment';
import { createLogger, format, Logger, transports } from 'winston';

@Injectable()
export class CustomLoggerService implements LoggerService {
  private readonly logger: Logger;

  constructor() {
    this.logger = createLogger({
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message, context }) => {
          return `[${timestamp}] [${level.toUpperCase()}]${
            context ? ` [${context}]` : ''
          }: ${message}`;
        }),
      ),
      transports: [
        new transports.Console(), // Console transport
        new transports.File({
          filename: `logs/${moment().format('YYYY-MM-DD')}.log`,
        }), // File transport
      ],
    });
  }

  log(message: string, context?: string): void {
    if (context === 'RoutesResolver' || context === 'RouterExplorer') {
      return;
    }
    this.logger.info(message, { context });
  }

  info(message: string, context?: string): void {
    this.logger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string): void {
    this.logger.error(message, { trace, context });
  }

  warn(message: string, context?: string): void {
    this.logger.warn(message, { context });
  }

  debug?(message: string, context?: string): void {
    this.logger.debug(message, { context });
  }

  verbose?(message: string, context?: string): void {
    this.logger.verbose(message, { context });
  }
}
