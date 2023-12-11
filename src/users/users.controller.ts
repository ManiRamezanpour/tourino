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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { createReadStream } from 'fs';
import { join } from 'path';
import { GroupsService } from 'src/groups/groups.service';
import { authGuard } from 'src/guard/auht.guard';
import CheckRoleGuard from 'src/guard/check-roles.guard';
import { CreateTeamDto } from './dto/create-team.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('USER')
@UseGuards(CheckRoleGuard(['USER']))
@UseGuards(authGuard(false))
@ApiBearerAuth()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly group: GroupsService,
  ) {}

  // GET USER PROFILE
  @Get('/profile/:id')
  getProfile(@Param('id') id: number): Promise<any | User> {
    const user = this.usersService.findById(+id);
    return user;
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
  @Get('/group/:userId')
  async getUserGroup(@Param('id') id: number) {
    const user = await this.group.findByUserId(+id);
    const userGroups = user.Groups;
    console.log(userGroups);
    if (!user)
      throw new HttpException(
        'not groups found for this users !',
        HttpStatus.NOT_FOUND,
      );
    // throw new HttpException({ data: usersGroup }, HttpStatus.FOUND);
  }

  @ApiTags('User group')
  @Post('/group/:userId')
  async addUserGroups(@Param('userId') id: number, @Body() body) {
    const groups = await this.group.addUserGroup(body.groupCodes, +id);
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
