import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { IRepository } from 'src/common/repository.types';
import { UserRepository } from './user.repository';
import { RoleModule } from '../role/role.module';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: IRepository.IUserRepository,
      useClass: UserRepository,
    },
  ],
  exports: [IRepository.IUserRepository],
  imports: [RoleModule],
})
export class UsersModule {}
