import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  id: number;

  @ApiProperty({
    example: 'YOUR NAME',
    required: true,
  })
  fullname: string;

  @ApiProperty({
    example: '9831334324',
    required: true,
  })
  mobile: number;
}
