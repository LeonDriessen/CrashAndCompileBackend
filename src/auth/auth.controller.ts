import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('admin')
  async validateUser(
    @Body('username') bodName: string,
    @Body('password') bodPassword: string,
  ) {
    console.log('IN VALIDATE USER');
    const result = await this.authService.validateUser(bodName, bodPassword);
    return result;
  }
}
