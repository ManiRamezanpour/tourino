import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FirstRegister } from 'src/common/types/Types';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { codeGenerator } from 'src/utils/RandomCode';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUserByTokenPayload(id: number) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (user) {
      const { ...result } = user;
      return result;
    }
    return null;
  }
  async validateUser({ mobile }: FirstRegister): Promise<any> {
    const user = await this.userService.findOne(mobile);
    if (user) {
      const { ...result } = user;
      return result;
    }
    return null;
  }
  async ValideOneTimePassword(UserCode): Promise<boolean> {
    const otp: number = Number(codeGenerator(6));
    return otp == UserCode ? true : false;
  }

  async UserLogin(data: { otp: string; mobile: string }) {
    const user = await this.userService.findOne(data.mobile);
    return user;
  }
  async CLientLogin(username: string) {
    const client = this.prisma.clients.findFirst({
      where: { username: username },
    });
    return client;
  }
}
