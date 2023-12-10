import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
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

  async login(data: { otp: string; mobile: string }) {
    console.log(data);
    const user = await this.userService.findOne(data.mobile);
    if (!user) {
      throw new HttpException(
        "your mobile number doesn't exist",
        HttpStatus.FORBIDDEN,
      );
    }
    if (user.otp != data.otp) {
      return new HttpException('OTP is not valid !', HttpStatus.NOT_FOUND);
    }
    const payload: { sub: any; user: { role: any; fullname: any; id: any } } = {
      sub: user.id,
      user: {
        role: 'USER',
        fullname: user.fullname,
        id: user.id,
      },
    };
    return {
      Token: this.jwtService.sign(payload),
      message: 'Verification is compeleted !',
    };
  }
}
