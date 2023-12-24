import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsDto {
  @ApiProperty({
    example: 'fes',
    required: true,
  })
  title: string;
  @ApiProperty({
    example: 'fes',
    required: true,
  })
  description: string;
}
