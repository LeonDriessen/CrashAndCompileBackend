import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './users.model';
export type User2 = any;

@Injectable()
export class UsersService {
  private readonly users: User2[];

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {
    this.users = [
      {
        userId: 1,
        username: 'admin',
        password: 'zegiklekkerniet',
      },
    ];
  }

  async findOne(username: string): Promise<User> {
    return this.userModel.findOne({ username: username });
  }

  async getUsers() {
    const users = await this.userModel.find().exec();
    return users.map(user => ({
      id: user.id,
      username: user.username,
      role: user.role,
      password: user.password,
      __v: user.__v,
    }));
  }

  async createUser(username: string, role: string, password: string) {
    const newUser = new this.userModel({
      username,
      role,
      password,
    });
    const result = await newUser.save();
    return result.id as string;
  }

  async deleteUser(userId: string) {
    const result = await this.userModel.deleteOne({ _id: userId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find user to delete.');
    }
  }
}
