import { ApiProperty } from '@nestjs/swagger';
import { Stats } from '@prisma/client';

export class CreateProgramDto {
  @ApiProperty({
    example: 'name',
    required: true,
  })
  name: string;

  @ApiProperty({
    example: '2312312',
    required: true,
  })
  groupsCode: string;
  @ApiProperty({
    example: 'ACTIVE',
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
  @ApiProperty({
    example: [''],
    required: true,
  })
  image: string[];
  @ApiProperty({
    example: 'tehran',
    required: true,
  })
  startPlace: string;
  @ApiProperty({
    example: 'jangal',
    required: true,
  })
  type: string;
  @ApiProperty({
    example: '100',
    required: true,
  })
  capacity: string;
  @ApiProperty({
    example: 'student',
    required: true,
  })
  access: string;
  @ApiProperty({
    example: ['breakfast'],
    required: true,
  })
  service: string[];
  @ApiProperty({
    example: ['free-access'],
    required: true,
  })
  options: string[];
  @ApiProperty({
    example: ['phone', 'free-internet'],
    required: true,
  })
  gatgets: string[];
  @ApiProperty({
    example: 'a122',
    required: true,
  })
  caitions: string;
  @ApiProperty({
    example: '12%',
    required: true,
  })
  maxBonuses: string;

  @ApiProperty({
    example: 'lorem ipsum test 2',
    required: true,
  })
  description: string;
}
