import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class StartupCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  productType: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
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
  @IsNotEmpty()
  raiseType: string;

  @IsString()
  @IsNotEmpty()
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
  @IsNotEmpty()
  telegram: string;

  @IsOptional()
  @IsString()
  otherServicesNeeded?: string;

  @IsOptional()
  @IsString()
  discoverySource?: string;
}
