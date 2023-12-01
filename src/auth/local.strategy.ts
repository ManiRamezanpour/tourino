import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Strategy } from 'passport-local';
import { FirstRegister } from 'src/common/types/Types';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate({ fullname, mobile }: FirstRegister): Promise<any | User> {
    const user = await this.authService.validateUser({ mobile, fullname });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
