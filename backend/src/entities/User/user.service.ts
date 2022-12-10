import { HttpException, Injectable } from '@nestjs/common';

import { CreateUserDTO } from './@types';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser({ email, name, password }: CreateUserDTO) {
    const userAlredyExists = await this.userRepository.findByEmail(email);

    if (userAlredyExists) {
      throw new HttpException('This user already exists', 400);
    }

    await this.userRepository.create({
      name,
      email,
      password,
    });
  }
}
