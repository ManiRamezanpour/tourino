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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
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
    console.log(user);
    return user;
  }
  // UPDATE USER PROFILE
  @Put('/profile/update/:id')
  updateProfile(@Req() req, @Param('id') id: number) {
    const { body } = req;
    this.usersService.updateUserProfile(+id, body);
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

  //! USER GROUP
  @ApiTags('User group')
  @ApiBearerAuth('access-token') //edit here
  @Get('/group/:id')
  async getUserGroup(@Param('id') id: number) {
    const usersGroup = await this.group.findByUserId(+id);
    console.log(usersGroup);
    console.log(usersGroup);
    if (!usersGroup || (await usersGroup).length === 0)
      throw new HttpException(
        'not groups found for this users !',
        HttpStatus.NOT_FOUND,
      );
    throw new HttpException({ data: usersGroup }, HttpStatus.FOUND);
  }
  @ApiTags('User group')
  @Post('/group/:id')
  async createUserGroup(@Param('id') id: number, @Body() groupCodes: string) {
    const groups = await this.group.addUserGroup(groupCodes, +id);
    if (groups) {
      throw new HttpException(
        'user addded to group succuss',
        HttpStatus.ACCEPTED,
      );
    }
    throw new HttpException('user not added !', HttpStatus.FORBIDDEN);
  }
}
