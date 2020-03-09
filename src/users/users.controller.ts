import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
var encrypt = require('bcryptjs');

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    const Users = await this.usersService.getUsers();
    return Users;
  }

  @Get(':username')
  async getUser(@Param('username') username: string) {
    console.log('in getusername');
    const result = await this.usersService.findOne(username);
    return result;
  }

  @Post()
  async createUser(
    @Body('username') bodUsername: string,
    @Body('role') bodRole: string,
    @Body('password') bodPassword: string,
  ) {
    const salt = await encrypt.genSalt(10);
    const hashed = await encrypt.hash(bodPassword, salt);
    const generatedUser = await this.usersService.createUser(
      bodUsername,
      bodRole,
      hashed,
    );

    return { id: generatedUser };
  }

  //const hashed_password = bodPassword.encryptPassword;
  //console.log(crypto.createHmac('sha256', bodPassword));
  //console.log(hashed_password);

  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    await this.usersService.deleteUser(userId);
    return null;
  }
}
