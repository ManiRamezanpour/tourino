import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { createReadStream } from 'fs';
import { join } from 'path';
import { authGuard } from 'src/guard/auht.guard';
import { AddUserGroup } from './dto/add-user-group.dto';
import { CreateTeamDto } from './dto/create-team.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('USER')
export class UsersController {
  group: any;
  constructor(private readonly usersService: UsersService) {}

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
  @Get('/group/')
  async getUserGroup(@Param('userId') id: number) {
    const user = await this.usersService.findById(+id);
    const userGroupsArray = user.Groups;
    if (userGroupsArray.length == 0) {
      throw new HttpException(
        { message: 'groups not found for this usere' },
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException(
      { message: 'users group founded !', data: userGroupsArray },
      HttpStatus.FOUND,
    );
  }
  // ADD USER TO GROUP
  @ApiTags('User group')
  @Post('/group/:userId')
  async addUserGroups(@Param('userId') id: number, @Body() add: AddUserGroup) {
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
  @ApiTags('User group')
  @Get('/upload')
  async getFile(): Promise<StreamableFile> {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    console.log(file);
    return new StreamableFile(file);
  }
}
