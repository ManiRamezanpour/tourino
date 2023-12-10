import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { codeGenerator } from 'src/utils/RandomCode';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { OTPValidationDto } from './dtos/otp-validation.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  // REGISTER METHOD
  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const { mobile, fullname } = createUserDto;
    const otp: string = codeGenerator(6);
    console.log(otp);
    return await this.userService.createUser({ mobile, fullname, otp });
  }
  // CHECK OTP METHOD IS VALID
  @Post('/otp/verify')
  async otp(@Body() otpvlaidationdto: OTPValidationDto) {
    const user = await this.userService.findOne(otpvlaidationdto.mobile);
    console.log(user);
    if (!user) {
      throw new HttpException(
        "your mobile number dosn't exist",
        HttpStatus.FORBIDDEN,
      );
    }
    if (otpvlaidationdto.otp != parseInt(user.otp)) {
      return new HttpException('OTP is not valid !', HttpStatus.NOT_FOUND);
    }

    return new HttpException('user registered succusss !', HttpStatus.ACCEPTED);
  }
  // LOGIN METHOD
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login({
      mobile: loginDto.mobile,
      otp: loginDto.otp,
    });
  }
}
