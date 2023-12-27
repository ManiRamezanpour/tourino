import { ApiProperty } from '@nestjs/swagger';
import { Stats } from '@prisma/client';

export class CreateProgramDto {
  @ApiProperty({
    example: 'name',
    required: true,
  })
  name: string;

  @ApiProperty({
    example: '9831334324',
    required: true,
  })
  groupCode: string;
  @ApiProperty({
    example: '9831334324',
    required: true,
  })
  status: Stats;
  @ApiProperty({
    example: 'Ali',
    required: true,
  })
  time: string;
  @ApiProperty({
    example: 'a2',
    required: true,
  })
  departure: string;
  @ApiProperty({
    example: 'a2',
    required: true,
  })
  destination: string;
  @ApiProperty({
    example: 'a2',
    required: true,
  })
  price: string;
}
