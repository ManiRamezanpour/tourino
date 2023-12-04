import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { codeGenerator } from 'src/utils/RandomCode';
import { AuthService } from './auth.service';
import { OTPValidationDto } from './dtos/otp-validation.dto';
import { LoginDto } from './dtos/login.dto';

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
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: CreateUserDto,
    description: 'Json structure for user object',
  })
  async register(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const { mobile, fullname } = createUserDto;
    const otp: string = codeGenerator(6);
    await this.userService.createUser({ mobile, fullname, otp });
  }
  // CHECK OTP METHOD IS VALID
  @Post('/otp')
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
    const user = await this.authService.login(loginDto.mobile);
    if (!user) {
      throw new HttpException(
        "your mobile number doesn't exist",
        HttpStatus.FORBIDDEN,
      );
    }
    return user;
  }
}
