import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'YOUR NAME',
    required: true,
  })
  fullname: string;

  @ApiProperty({
    example: '9831334324',
    required: true,
  })
  mobile: string;
}
