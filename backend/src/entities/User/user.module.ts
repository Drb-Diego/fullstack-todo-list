import { Module } from '@nestjs/common';
import { PrismaService } from '../../database';

import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [UserController],
  providers: [PrismaService, UserService, UserRepository],
})
export class UserModule {}
