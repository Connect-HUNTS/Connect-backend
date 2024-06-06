import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { InvestorCreateDto } from './investor-create.dto';
import { StartupCreateDto } from './startup-create.dto';
import { PartnerCreateDto } from './partner-create.dto';

export class UserCreateDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  role: string;

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
