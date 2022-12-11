import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO, LoginDTO } from './@types';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() createUserBody: CreateUserDTO) {
    const { email, name, password } = createUserBody;

    await this.userService.createUser({ email, name, password });
    return { message: 'User created' };
  }

  @Post('login')
  async login(@Body() loginBody: LoginDTO) {
    const { email, password } = loginBody;

    const token = await this.userService.login({ email, password });
    return { token };
  }
}
