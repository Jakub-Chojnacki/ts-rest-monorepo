import { Controller, Request, UseGuards } from '@nestjs/common';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { contract } from 'api-contract';

import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @TsRestHandler(contract.login)
  async loginHandler(@Request() req) {
    return tsRestHandler(contract.login, async () => {
      const userToken = await this.authService.login(req.user);

      return {
        status: 201,
        body: userToken,
      };
    });
  }

  @TsRestHandler(contract.signup)
  async signupHandler() {
    return tsRestHandler(contract.signup, async ({ body }) => {
      const hashedPassword = await this.authService.hashPassword(body.password);

      const userData = {
        ...body,
        password: hashedPassword,
      };
      
      const newUser = await this.authService.signup(userData);

      return {
        status: 201,
        body: newUser,
      };
    });
  }
}
