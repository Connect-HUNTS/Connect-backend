import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PartnerCreateDto {
  @IsString()
  @IsNotEmpty()
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
  @IsString({ each: true })
  links: string[];

  @IsArray()
  @IsString({ each: true })
  type: string[];

  @IsArray()
  @IsString({ each: true })
  proposals: string[];

  @IsOptional()
  @IsString()
  contactEmail?: string;

  @IsOptional()
  @IsString()
  keyCases?: string;

  @IsArray()
  @IsString({ each: true })
  contacts: string[];
}
