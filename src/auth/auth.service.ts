import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { FirstRegister, IPayload } from 'src/common/types/Types';
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

  async validateUser({ mobile }: FirstRegister): Promise<any | User> {
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

  async login(id: number) {
    const user = await this.userService.findOne(+id);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload: IPayload = {
      sub: user.id,
      fullname: user.fullname,
      mobile: user.mobile,
      role: user.role,
    };
    return {
      Token: this.jwtService.sign(payload),
    };
  }
}
