import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ILoginRequest, ILoginResponse } from './auth.dto';
import { IRepository } from 'src/common/repository.types';
import { UserRepository } from '../user/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/common/constants';

@Injectable()
export class AuthService {
  constructor(
    @Inject(IRepository.IUserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async login(user: ILoginRequest): Promise<ILoginResponse> {
    const findUser = await this.userRepository.findByUsername(user.username);
    if (!findUser)
      throw new HttpException(
        'Invalid username / password',
        HttpStatus.BAD_REQUEST,
      );

    const comparedPassword = await bcrypt.compare(
      user.password,
      findUser.password,
    );

    if (!comparedPassword)
      throw new HttpException(
        'Invalid username / password',
        HttpStatus.BAD_REQUEST,
      );

    const payload = this.jwtService.sign({
      username: findUser.username,
      name: findUser.name,
    });
    return {
      token: payload,
      expired: jwtConstants.expired,
    };
  }
}
