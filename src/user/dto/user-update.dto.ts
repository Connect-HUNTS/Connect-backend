import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { InvestorUpdateDto } from './investor-update.dto';

export class UserUpdateDto {
  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  profileImage?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => InvestorUpdateDto)
  investor?: InvestorUpdateDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => InvestorUpdateDto)
  startup?: InvestorUpdateDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => InvestorUpdateDto)
  partner?: InvestorUpdateDto;
}
