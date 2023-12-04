import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({
    example: '1',
    required: true,
  })
  PackageId: number;

  @ApiProperty({
    example: 'ALIBABA',
    required: true,
  })
  company_name: string;

  @ApiProperty({
    example: 'Mazandran',
    required: true,
  })
  province: string;

  @ApiProperty({
    example: 'Sari',
    required: true,
  })
  city: string;

  @ApiProperty({
    example: 'Ali',
    required: true,
  })
  cto_name: string;

  @ApiProperty({
    example: '2081356007',
    required: true,
  })
  cto_nationCode: string;

  @ApiProperty({
    example: '402934023',
    required: true,
  })
  cto_phone: string;

  @ApiProperty({
    example: 'manirmp@gmail.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    example: '*******',
    required: true,
  })
  password: string;
  @ApiProperty({
    example: '2312312',
    required: true,
  })
  groupCode: string;
}
