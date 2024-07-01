import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { InvestorDto } from './investor.dto';
import { StartupDto } from './startup.dto';
import { PartnerDto } from './partner.dto';

export class UserCreateDto {
  @IsEmail()
  @IsNotEmpty()
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
