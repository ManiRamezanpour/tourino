import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 32321312,
    required: true,
  })
  mobile: string;
  @ApiProperty({
    example: '1234',
    required: true,
  })
  otp: string;
  status: string;
}
