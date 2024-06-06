import { Transform, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class InvestorCreateDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsString()
  @IsOptional()
  investorType: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsString()
  @IsOptional()
  contactInformation: string;

  @IsString()
  @IsOptional()
  investmentType: string;

  @IsString()
  @IsOptional()
  fundingRound: string;

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
  @Transform(({ value }) =>  value === 'true')
  leadInvestor: boolean;

  @IsOptional()
  @IsString()
  description?: string;
}
