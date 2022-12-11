import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database';

import { CreateUserDTO } from './@types';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    const userFinded = await this.prisma.user.findUnique({ where: { email } });

    return userFinded;
  }

  async create({ name, email, password }: CreateUserDTO) {
    const userCreated = await this.prisma.user.create({
      data: { name, email, password },
    });

    return {
      id: userCreated.id,
      name: userCreated.name,
      email: userCreated.email,
    };
  }
}
