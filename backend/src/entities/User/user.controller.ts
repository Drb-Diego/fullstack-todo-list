import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './@types';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() createUserBody: CreateUserDTO) {
    const { email, name, password } = createUserBody;

    this.userService.createUser({ email, name, password });
    return { message: 'User created' };
  }
}
