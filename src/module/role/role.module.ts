import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleRepository } from './role.repository';
import { IRepository } from 'src/common/repository.types';

@Module({
  controllers: [RoleController],
  providers: [
    RoleService,
    {
      provide: IRepository.IRoleRepository,
      useClass: RoleRepository,
    },
  ],
  exports: [RoleService],
})
export class RoleModule {}
