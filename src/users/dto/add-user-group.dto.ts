import { ApiProperty } from '@nestjs/swagger';

export class AddUserGroup {
  @ApiProperty({
    example: 'GroupCode',
    required: true,
  })
  groupCode: string;
}
