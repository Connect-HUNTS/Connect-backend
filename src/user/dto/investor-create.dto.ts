import { Transform, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class InvestorCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  investorType: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsString()
  @IsNotEmpty()
  contactInformation: string;

  @IsString()
  @IsNotEmpty()
  investmentType: string;

  @IsString()
  @IsNotEmpty()
  fundingRound: string;

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
  description?: string;
}
