import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { InvestorUpdateDto } from './investor-update.dto';
import { StartupUpdateDto } from './startup-update.dto';
import { PartnerUpdateDto } from './partner-update.dto';
import { Type } from 'class-transformer';
import { InvestorCreateDto } from './investor-create.dto';
import { StartupCreateDto } from './startup-create.dto';
import { PartnerCreateDto } from './partner-create.dto';

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
  @Type(() => InvestorCreateDto)
  investor?: InvestorCreateDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => StartupCreateDto)
  startup?: StartupCreateDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => PartnerCreateDto)
  partner?: PartnerCreateDto;
}
