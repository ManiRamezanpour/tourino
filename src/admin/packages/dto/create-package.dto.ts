import { ApiProperty } from '@nestjs/swagger';

export class CreatePackageDto {
  @ApiProperty({
    example: 'golden',
    required: true,
  })
  name: string;
  @ApiProperty({
    example: '10',
    required: true,
  })
  price: string;
  @ApiProperty({
    example: '30Days',
    required: true,
  })
  expirationTime: string;
}
