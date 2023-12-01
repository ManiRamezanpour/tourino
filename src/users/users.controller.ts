import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { CreateTeamDto } from './dto/create-team.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('USER')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // get user profile
  @Get('/profile/:id')
  getProfile(@Param('id') id: number): Promise<any | User> {
    const user = this.usersService.findOne(+id);
    return user;
  }
  // update user profile
  @Put('/profile/completion/:id')
  updateProfile(@Req() req, @Param('id') id: number) {
    const { body } = req;
    this.usersService.updateUserProfile(+id, body);
  }
  @ApiTags('TEAM')
  @Get('/team/:id')
  getListOfMyTeam(@Param('id') id: string) {
    const myTeam = this.usersService.getListOfMyTeam(+id);
    return new HttpException({ data: myTeam }, HttpStatus.FOUND);
  }
  @ApiTags('TEAM')
  @Post('/team/:id')
  addNewTeam(@Body() createTeamDto: CreateTeamDto, @Param('id') id: string) {
    console.log(+id);
    console.log(createTeamDto);
    this.usersService.addnewTeam(+id, createTeamDto);
  }
}
