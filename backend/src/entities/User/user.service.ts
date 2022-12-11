import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateUserDTO, LoginDTO } from './@types';
import { UserRepository } from './user.repository';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async createUser({ email, name, password }: CreateUserDTO) {
    const userAlredyExists = await this.userRepository.findByEmail(email);

    if (userAlredyExists) {
      throw new HttpException(
        'This user already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 3);

    await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
  }

  async login({ email, password }: LoginDTO) {
    const userFinded = await this.userRepository.findByEmail(email);

    if (!userFinded) {
      throw new HttpException('Wrong email', HttpStatus.BAD_REQUEST);
    }

    const passwordIsValid = await bcrypt.compare(password, userFinded.password);

    if (!passwordIsValid) {
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    }

    const token = this.jwtService.sign({
      id: userFinded.id,
      email: userFinded.email,
      name: userFinded.name,
    });

    return token;
  }
}
