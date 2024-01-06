import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientService } from 'src/client/client.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProgramService } from 'src/program/program.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    JwtService,
    ProgramService,
    ClientService,
  ],
})
export class UsersModule {}
