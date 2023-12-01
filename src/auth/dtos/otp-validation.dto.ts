import { ApiProperty } from '@nestjs/swagger';

export class OTPValidationDto {
  @ApiProperty({
    example: '98313',
    required: true,
  })
  otp: number;
  @ApiProperty({
    example: '983133224',
    required: true,
  })
  mobile: number;
}
