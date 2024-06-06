import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class StartupUpdateDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  productType?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  mainFeatures?: string;

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

  @IsOptional()
  @IsString()
  raiseType?: string;

  @IsOptional()
  @IsString()
  fundingRound?: string;

  @IsOptional()
  @Type(() => Number)
  fundraisingGoal?: number;

  @IsOptional()
  @Type(() => Number)
  raisedToDate?: number;

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

  @IsOptional()
  @IsString()
  telegram?: string;

  @IsOptional()
  @IsString()
  otherServicesNeeded?: string;

  @IsOptional()
  @IsString()
  discoverySource?: string;
}
