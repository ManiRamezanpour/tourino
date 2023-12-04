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
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CreateTeamDto } from './dto/create-team.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('USER')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // get user profile
  @ApiBearerAuth('access-token') //edit here
  @Get('/profile/:id')
  getProfile(@Param('id') id: number): Promise<any | User> {
    const user = this.usersService.findOneById(+id);
    console.log(user);
    return user;
  }
  // update user profile
  @Put('/profile/update/:id')
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
