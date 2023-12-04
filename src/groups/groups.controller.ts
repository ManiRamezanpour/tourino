import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GroupsService } from './groups.service';

@Controller('groups')
@ApiTags('Groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':groupCodes')
  async findByGroupCodes(@Param('groupCodes') groupCodes: string) {
    const group = await this.groupsService.findByGroupCodes(groupCodes);
    if (!group)
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    throw new HttpException({ data: group }, HttpStatus.OK);
  }
}
