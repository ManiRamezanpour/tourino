import { ApiProperty } from '@nestjs/swagger';

export class ClientLoginDto {
  @ApiProperty({
    example: 'fdsfsd',
    required: true,
  })
  username: string;
  @ApiProperty({
    example: '1233',
    required: true,
  })
  password: string;
}
