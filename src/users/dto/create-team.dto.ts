import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @ApiProperty({
    example: 'YOUR NAME',
    required: true,
  })
  fullname: string;

  @ApiProperty({
    example: '9831334324',
    required: true,
  })
  natinalCode: number;
  @ApiProperty({
    example: '9831334324',
    required: true,
  })
  image: string;
  @ApiProperty({
    example: 'Ali',
    required: true,
  })
  fatherName: string;
  @ApiProperty({
    example: 'a2',
    required: true,
  })
  bloodCategory: string;
}
