import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Investor, Partner, Prisma, Startup, User } from '@prisma/client';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() userData: Prisma.UserCreateInput): Promise<void> {
    await this.userService.createUser(userData);
  }

  @Get('investors')
  @UseGuards(AuthGuard)
  async getInvestors(@Query('limit') limit: number, @Query('offset') offset: number): Promise<Investor[]> {
    return this.userService.getInvestors(limit, offset);
  }

  @Get('startups')
  @UseGuards(AuthGuard)
  async getStartups(@Query('limit') limit: number, @Query('offset') offset: number): Promise<Startup[]> {
    return this.userService.getStartups(limit, offset);
  }

  @Get('partners')
  @UseGuards(AuthGuard)
  async getPartners(@Query('limit') limit: number, @Query('offset') offset: number): Promise<Partner[]> {
    return this.userService.getPartners(limit, offset);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findUserById(id);
  }
}
