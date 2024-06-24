import { Transform, Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class InvestorDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  investorType: string[];

  @IsOptional()
  @IsString()
  website?: string;

  @IsString()
  @IsOptional()
  contactInformation: string;

  @IsString()
  @IsOptional()
  investmentType: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  fundingRound: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  type: string[];

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  minTicketSize: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  maxTicketSize: number;

  @Type(() => String)
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  leadInvestor: boolean;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  rate?: string;

  @IsOptional()
  @IsString()
  telegram?: string;
}
