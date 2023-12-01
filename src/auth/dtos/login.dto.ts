import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 32321312,
    required: true,
  })
  mobile: number;
}
