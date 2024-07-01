import { IsArray, IsOptional, IsString } from 'class-validator';

export class PartnerDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  websiteLink?: string;

  @IsOptional()
  @IsString()
  telegram?: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  type: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  proposals: string[];

  @IsOptional()
  @IsString()
  contactEmail?: string;

  @IsOptional()
  @IsString()
  keyCases?: string;

  @IsOptional()
  @IsString()
  contact?: string;

  @IsOptional()
  @IsString()
  averageBill?: number;

  @IsOptional()
  @IsString()
  referralFee?: string;
}
