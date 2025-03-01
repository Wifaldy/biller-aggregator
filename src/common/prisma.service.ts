import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { CustomLoggerService } from './logger.service';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, String>
  implements OnModuleInit
{
  constructor(private readonly logger: CustomLoggerService) {
    super({
      log: [
        {
          level: 'info',
          emit: 'event',
        },
        {
          level: 'warn',
          emit: 'event',
        },
        {
          level: 'error',
          emit: 'event',
        },
        {
          level: 'query',
          emit: 'event',
        },
      ],
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.$on('info', (e) => {
        this.logger.info(e.message);
      });
      this.$on('warn', (e) => {
        this.logger.warn(e.message);
      });
      this.$on('error', (e) => {
        this.logger.error(e.message);
      });
      this.$on('query' as any, (_e: Prisma.QueryEvent) => {
        // this.logger.info(e.query);
      });
    } catch (error) {
      this.logger.error('Database connection failed', error.message);
    }
  }
}
