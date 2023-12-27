import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { authGuard } from 'src/guard/auht.guard';
import { ProgramService } from 'src/program/program.service';
import { AddUserGroup } from './dto/add-user-group.dto';
import { CreateTeamDto } from './dto/create-team.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('USER')
export class UsersController {
  group: any;
  constructor(
    private readonly usersService: UsersService,
    private program: ProgramService,
  ) {}

  // GET USER PROFILE
  @UseGuards(authGuard(false))
  @Get('/profile/:id')
  async getProfile(@Param('id') id: number): Promise<User | any> {
    const user = await this.usersService.findById(+id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    throw new HttpException({ data: user }, HttpStatus.FOUND);
  }
  // UPDATE USER PROFILE
  @Put('/profile/update/:id')
  async updateProfile(@Body() data, @Param('id') id: number) {
    console.log(data);
    const update = await this.usersService.updateUserProfile(+id, data);
    console.log(update);
    throw new HttpException(
      {
        data: update,
        message: 'user profile was compoleted !',
      },
      HttpStatus.ACCEPTED,
    );
  }
  // ADD TEAM
  @ApiTags('TEAM')
  @Get('/team/:id')
  async getListOfMyTeam(@Param('id') id: string) {
    const myTeam = await this.usersService.getListOfMyTeam(+id);
    console.log(myTeam);

    return new HttpException({ data: myTeam }, HttpStatus.FOUND);
  }
  // GET TEAM LIST
  @ApiTags('TEAM')
  @Post('/team/:id')
  async addNewTeam(
    @Body() createTeamDto: CreateTeamDto,
    @Param('id') id: string,
  ) {
    await this.usersService.addnewTeam(+id, createTeamDto);
  }

  // GET USER GROUPS
  @ApiTags('User group')
  @Get('/group/:id')
  async getUserGroup(@Param('id') id: number) {
    const user = await this.usersService.findById(+id);
    const { Groups } = user;
    console.log(Groups);

    if (Groups.length == 0) {
      throw new HttpException(
        { message: 'groups not found for this usere' },
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException(
      { message: 'users group founded !', data: Groups },
      HttpStatus.FOUND,
    );
  }
  // ADD USER TO GROUP
  @ApiTags('User group')
  @Post('/group/:id')
  async addUserGroups(@Param('id') id: number, @Body() add: AddUserGroup) {
    const { groupCode } = add;
    console.log(groupCode);
    const groups = await this.usersService.addUserGroup(groupCode, +id);
    console.log(groups);
    if (groups) {
      throw new HttpException(
        {
          data: groups,
          message: 'user addded to group succuss',
        },
        HttpStatus.ACCEPTED,
      );
    }
    throw new HttpException('user not added !', HttpStatus.FORBIDDEN);
  }
  @ApiTags('User Programs')
  @Post('/programs/:userId/:groupCode/:programId')
  async registerUserPrograms(
    @Param('userId') userId: number,
    @Param('programId') programId: number,
    @Param('groupCode') groupCode: string,
  ) {
    const create = await this.program.userRegisterForProgram(
      +userId,
      +programId,
      groupCode,
    );
    if (!create)
      throw new HttpException('Not registered !!!', HttpStatus.BAD_REQUEST);
    throw new HttpException(
      { message: 'registered was succussed !!!', data: create },
      HttpStatus.ACCEPTED,
    );
  }
  @ApiTags('User Programs')
  @Get('/programs/:userId')
  async getUserPrograms(@Param('userId') userId: number) {
    const programs = await this.program.findUserPrograms(+userId);
    throw new HttpException(programs, HttpStatus.FOUND);
  }
}
