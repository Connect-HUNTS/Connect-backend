import { IsArray, IsOptional, IsString } from 'class-validator';

export class PartnerCreateDto {
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

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  links: string[];

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

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  contacts: string[];
}
