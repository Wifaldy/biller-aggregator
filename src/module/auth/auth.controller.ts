import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BaseResponse, createBaseResponse } from 'src/common/base.response';
import { ILoginRequest, ILoginResponse } from './auth.dto';
import { ValidationService } from 'src/common/validation.service';
import { AuthValidation } from './auth.validation';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private validationService: ValidationService,
  ) {}

  @Post('/login')
  async login(
    @Body() auth: ILoginRequest,
  ): Promise<BaseResponse<ILoginResponse>> {
    const validationAuth = await this.validationService.validate(
      AuthValidation.LOGIN,
      auth,
    );
    const result = await this.authService.login({
      username: validationAuth.username,
      password: validationAuth.password,
    });

    return createBaseResponse(result);
  }
}
