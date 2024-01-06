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
import { NotFoundError } from 'rxjs';
import { ClientService } from 'src/client/client.service';
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
    private readonly program: ProgramService,
    private readonly client: ClientService,
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
    throw new HttpException({ data: user }, HttpStatus.OK);
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
  @Get('/team')
  async getListOfMyTeam(@Request() req: any): Promise<HttpException | null> {
    const id = parseInt(req.user.id);
    const myTeam = await this.usersService.getListOfMyTeam(id);
    return new HttpException({ data: myTeam }, HttpStatus.OK);
  }
  // GET TEAM LIST
  @ApiTags('TEAM')
  @Post('/team')
  async addNewTeam(@Body() createTeamDto: CreateTeamDto, @Request() req: any) {
    const id = parseInt(req.user.id);
    await this.usersService.addnewTeam(id, createTeamDto);
  }

  // GET USER GROUPS
  @ApiTags('User-Group')
  @Get('/group')
  async getUserGroups(@Request() req: any) {
    const id = parseInt(req.user.id);
    const user = await this.usersService.findById(id);
    const { Groups } = user;
    const usersGroups: any[] = [];
    console.log(usersGroups);
    for (let i = 0; i < Groups.length; i++) {
      const group = await this.client.findOneByGroupCode(Groups[i]);
      usersGroups.push(group);
    }
    return new HttpException({ data: usersGroups }, HttpStatus.OK);
  }
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
      HttpStatus.OK,
    );
  }
  // ADD USER TO GROUP
  @ApiTags('User-Group')
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
  @ApiTags('User-Programs')
  @Post('/programs')
  async registerUserPrograms(@Request() req: any, @Body() res: any) {
    const userId = req.user.id;
    console.log(res.usersTeamId);
    const create = await this.program.userRegisterForProgram(
      userId,
      res.programId,
      res.groupCode,
      res.usersTeamId,
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
    throw new HttpException(programs, HttpStatus.OK);
  }

  @ApiTags('User-Gatgets')
  @UseGuards(JwtAuthGuard)
  @Get('gadgets')
  async getUserGadgets(@Request() req: any) {
    const id = req.user.id;
    const user = await this.usersService.findAllGadgets(id);
    if (!user) throw new NotFoundError('User not found');
    throw new HttpException({ data: user.myGadgets }, HttpStatus.OK);
  }
  @ApiTags('User-Gatgets')
  @UseGuards(JwtAuthGuard)
  @Post('gadgets')
  async addUserGadgets(@Request() req: any, @Body() body: any) {
    const id = req.user.id;
    const user = await this.usersService.createUserGadgets(id, body.gadgets);
    if (!user) throw new NotFoundError('User not found');
    throw new HttpException({ data: user }, HttpStatus.OK);
  }

  @ApiTags('User-Programs')
  @UseGuards(JwtAuthGuard)
  @Post('favorite-programs/:programId')
  async addUserFavoriteProgram(
    @Request() req: any,
    @Param('programId') programId: number,
  ) {
    const id = req.user.id;
    const program = await this.program.findOne(+programId);
    console.log(program);
    if (!program)
      throw new HttpException('Program not found', HttpStatus.NOT_FOUND);
    const favorite = await this.usersService.addUserFavoriteProgram(
      id,
      +programId,
    );
    throw new HttpException(
      { data: favorite, message: 'program added to your favorite' },
      HttpStatus.OK,
    );
  }
  @ApiTags('User-Programs')
  @UseGuards(JwtAuthGuard)
  @Get('favorite-programs')
  async getUserFavoriteProgram(@Request() req: any) {
    const id = req.user.id;
    const favorites = await this.usersService.findUserFavoriteProgram(+id);
    throw new HttpException(
      { data: favorites, message: 'program added to your favorite' },
      HttpStatus.OK,
    );
  }
}
