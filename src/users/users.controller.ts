import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { ProgramService } from 'src/program/program.service';
import { AddUserGroup } from './dto/add-user-group.dto';
import { CreateTeamDto } from './dto/create-team.dto';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
@ApiTags('USER')
export class UsersController {
  group: any;
  constructor(
    private readonly usersService: UsersService,
    private program: ProgramService,
  ) {}

  // GET USER PROFILE
  @Get('/profile')
  async getProfile(@Request() req: any): Promise<User | any> {
    console.log(req);
    const id = parseInt(req.user.id);
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    throw new HttpException({ data: user }, HttpStatus.FOUND);
  }
  // UPDATE USER PROFILE
  @Put('/profile/update/')
  async updateProfile(@Body() data, @Request() req: any) {
    const id = parseInt(req.user.id);
    const update = await this.usersService.updateUserProfile(id, data);
    console.log(update);
    throw new HttpException(
      {
        data: update,
        message: 'user profile was completed !',
      },
      HttpStatus.ACCEPTED,
    );
  }
  // ADD TEAM
  @ApiTags('TEAM')
  @Get('/team/')
  async getListOfMyTeam(@Request() req: any): Promise<HttpException | null> {
    const id = parseInt(req.user.id);
    const myTeam = await this.usersService.getListOfMyTeam(id);
    return new HttpException({ data: myTeam }, HttpStatus.FOUND);
  }
  // GET TEAM LIST
  @ApiTags('TEAM')
  @Post('/team/')
  async addNewTeam(@Body() createTeamDto: CreateTeamDto, @Request() req: any) {
    const id = parseInt(req.user.id);
    await this.usersService.addnewTeam(id, createTeamDto);
  }

  // GET USER GROUPS
  @ApiTags('User group')
  @Get('/group/:id')
  async getUserGroup(@Request() req: any) {
    const id = parseInt(req.user.id);
    const user = await this.usersService.findById(id);
    const { Groups } = user;
    console.log(Groups);

    if (Groups.length == 0) {
      throw new HttpException(
        { message: 'groups not found for this user' },
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
  @Post('/group')
  async addUserGroups(@Request() req: any, @Body() add: AddUserGroup) {
    const id = parseInt(req.user.id);
    const { groupCode } = add;
    console.log(groupCode);

    const groups = await this.usersService.addUserGroup(groupCode, id);
    if (groups) {
      throw new HttpException(
        {
          data: groups,
          message: 'user added ot group succuss',
        },
        HttpStatus.ACCEPTED,
      );
    }
    throw new HttpException('user not added !', HttpStatus.FORBIDDEN);
  }
  @ApiTags('User Programs')
  @Post('/programs/:groupCode/:programId')
  async registerUserPrograms(
    @Param('programId') programId: number,
    @Param('groupCode') groupCode: string,
    @Request() req: any,
  ) {
    const userId = req.user.id;
    console.log(userId);
    const create = await this.program.userRegisterForProgram(
      userId,
      +programId,
      groupCode,
    );
    if (!create)
      throw new HttpException('Not registered !!!', HttpStatus.BAD_REQUEST);

    throw new HttpException(
      { message: 'registered was succuss !!!', data: create },
      HttpStatus.ACCEPTED,
    );
  }
  @ApiTags('User Programs')
  @Get('/programs')
  async getUserPrograms(@Request() req: any) {
    const userId = parseInt(req.user.id);
    const programs = await this.program.findUserPrograms(userId);
    throw new HttpException(programs, HttpStatus.FOUND);
  }
}
