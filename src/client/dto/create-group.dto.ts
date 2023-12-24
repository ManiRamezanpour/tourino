import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiProperty({
    example: 'groups',
    required: false,
  })
  name: string;
  @ApiProperty({
    example: 'groups',
    required: false,
  })
  description: string;
  @ApiProperty({
    example: 'active or notactive',
    required: false,
  })
  status: string;
  @ApiProperty({
    example: 'groups',
    required: true,
  })
  groupCodes: number;
}
