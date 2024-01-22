import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { PackagesService } from 'src/admin/packages/packages.service';
import { ClientService } from 'src/client/client.service';
import { CreateClientDto } from 'src/client/dto/create-client.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { compareHash } from 'src/utils/Helpers';
import { AuthService } from './auth.service';
import { ClientLoginDto } from './dtos/client-login.dto';
import { LoginDto } from './dtos/login.dto';
import { OTPValidationDto } from './dtos/otp-validation.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly packageService: PackagesService,
    private readonly clientService: ClientService,
    private readonly jwt: JwtService,
  ) {}

  // REGISTER METHOD
  @Post('/users/register')
  async userRegister(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const { mobile, fullname } = createUserDto;
    const status = '1234';
    const user = await this.userService.createUser({
      mobile,
      fullname,
      status,
    });
    const payload: {
      sub: any;
      user: { role: string; fullname: string; id: number };
    } = {
      sub: user.id,
      user: {
        role: 'User',
        fullname: user.fullname,
        id: user.id,
      },
    };
    const token = this.jwt.sign(payload);
    throw new HttpException(
      {
        data: {
          token,
        },
        message: 'User Was Registered !',
      },
      HttpStatus.ACCEPTED,
    );
  }
  // CLIENT REGISTER API
  @Post('/client/register')
  async clientRegister(@Body() createClientDto: CreateClientDto) {
    // static client package
    const packageId: number = createClientDto.packagesId;
    console.log(packageId);

    const item = await this.packageService.findOne(+packageId);
    if (!item)
      throw new HttpException('package not found', HttpStatus.NOT_FOUND);
    const client = await this.clientService.create(createClientDto, packageId);
    if (client)
      throw new HttpException(
        { data: client, message: 'client Created succuss !' },
        HttpStatus.CREATED,
      );
    throw new HttpException('Forribden', HttpStatus.NOT_FOUND);
  }
  // CHECK OTP METHOD IS VALID
  @Post('/otp/verify:/id')
  async otp(@Body() otpvlaidationdto: OTPValidationDto) {
    const user = await this.userService.findOne(otpvlaidationdto.mobile);
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
  // USER LOGIN METHOD
  @Post('/users/login')
  async userLogin(@Body() loginDto: LoginDto) {
    const user = await this.authService.UserLogin({
      mobile: loginDto.mobile,
      otp: loginDto.otp,
    });
    if (!user) throw new HttpException('Invalid Mobile', HttpStatus.NOT_FOUND);
    if (user.otp != loginDto.otp) {
      return new HttpException('OTP is not valid !', HttpStatus.NOT_FOUND);
    }

    const payload: {
      sub: any;
      user: { role: string; fullname: string; id: number };
    } = {
      sub: user.id,
      user: {
        role: 'User',
        fullname: user.fullname,
        id: user.id,
      },
    };
    const token = this.jwt.sign(payload);
    throw new HttpException(
      {
        data: {
          token,
        },
        message: 'User Login !',
      },
      HttpStatus.ACCEPTED,
    );
  }

  // CLIENT LOGIN
  @Post('/client/login')
  async clientLogin(@Body() loginDto: ClientLoginDto) {
    const client = await this.authService.CLientLogin(loginDto.username);
    if (!client)
      throw new HttpException(
        'client not found with this username',
        HttpStatus.NOT_FOUND,
      );
    const hashedComparedResult = compareHash(
      loginDto.password,
      client.password,
    );
    if (hashedComparedResult) {
      const payload: {
        sub: any;
        user: { role: any; username: any; id: any };
      } = {
        sub: client.id,
        user: {
          role: 'CLIENT',
          username: client.username,
          id: client.id,
        },
      };
      const token = this.jwt.sign(payload);

      throw new HttpException(
        {
          data: {
            token,
          },
          message: 'Client Login !',
        },
        HttpStatus.ACCEPTED,
      );
    }
  }
}
