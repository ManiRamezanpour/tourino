import { ApiProperty } from '@nestjs/swagger';

export class CreateBonusDto {
  @ApiProperty({ required: true, example: 'birthday' })
  title: string;
  @ApiProperty({ required: true, example: '10' })
  type: string;
  @ApiProperty({ required: true, example: '10' })
  amount: number;
}
