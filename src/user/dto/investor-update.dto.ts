import { IsOptional, IsString, IsArray, IsNumber } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class InvestorUpdateDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  investorType?: string;

  @IsOptional()
  @IsString()
  website?: string | null;

  @IsOptional()
  @IsString()
  contactInformation?: string;

  @IsOptional()
  @IsString()
  investmentType?: string;

  @IsOptional()
  @IsString()
  fundingRound?: string;

  @IsArray()
  @IsString({ each: true })
  type: string[];

  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  minTicketSize: number;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  maxTicketSize: number;

  @Type(() => String)
  @Transform(({ value }) =>  value === 'true')
  leadInvestor: boolean;

  @IsOptional()
  @IsString()
  description?: string | null;
}
