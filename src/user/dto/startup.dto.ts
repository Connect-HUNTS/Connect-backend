import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsArray } from 'class-validator';

export class StartupDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsString()
  @IsOptional()
  website?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  type: string[];

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

  @IsOptional()
  @IsString()
  telegram?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  otherServicesNeeded: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  discoverySource: string[];

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minInvestmentSize?: number;

  @IsOptional()
  @IsString()
  tgeDate?: string;
}
