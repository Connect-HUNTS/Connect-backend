import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class StartupCreateDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsString()
  @IsOptional()
  productType: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  mainFeatures: string;

  @IsOptional()
  @IsString()
  pitchDeckLink?: string;

  @IsOptional()
  @IsString()
  pitchVideoLink?: string;

  @IsOptional()
  @IsString()
  whitepaperLink?: string;

  @IsOptional()
  @IsString()
  tokenomicsSource?: string;

  @IsString()
  @IsOptional()
  raiseType: string;

  @IsString()
  @IsOptional()
  fundingRound: string;

  @IsNumber()
  @Type(() => Number)
  fundraisingGoal: number;

  @IsNumber()
  @Type(() => Number)
  raisedToDate: number;

  @IsOptional()
  @IsString()
  previousInvestors?: string;

  @IsOptional()
  @IsString()
  notableCustomersPartners?: string;

  @IsOptional()
  @IsString()
  tractionMetrics?: string;

  @IsOptional()
  @IsString()
  teamLinkedInProfiles?: string;

  @IsOptional()
  @IsString()
  socialMediaLinks?: string;

  @IsString()
  @IsOptional()
  telegram: string;

  @IsOptional()
  @IsString()
  otherServicesNeeded?: string;

  @IsOptional()
  @IsString()
  discoverySource?: string;
}
