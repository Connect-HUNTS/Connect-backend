import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { InvestorDto } from './investor.dto';
import { StartupDto } from './startup.dto';
import { PartnerDto } from './partner.dto';

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
  @Type(() => InvestorDto)
  investor?: InvestorDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => StartupDto)
  startup?: StartupDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => PartnerDto)
  partner?: PartnerDto;
}
