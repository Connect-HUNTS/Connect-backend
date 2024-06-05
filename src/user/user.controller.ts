import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Investor, Partner, Startup, User } from '@prisma/client';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../config/multer-options';
import { UserCreateDto } from './dto/user-create.dto';
import { Express } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('profileImage', multerOptions))
  async createUser(
    @UploadedFile() profileImage: Express.Multer.File,
    @Body() userData: UserCreateDto,
  ): Promise<void> {
    await this.userService.createUser(userData, profileImage);
  }

  @Get('investors')
  // @UseGuards(AuthGuard)
  async getInvestors(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('offset', ParseIntPipe) offset: number,
    @Query('sortBy') sortBy: string,
    @Query('sortOrder') sortOrder: 'asc' | 'desc',
    @Query() filters: { [key: string]: string },
  ): Promise<Investor[]> {
    return this.userService.getInvestors(limit, offset, sortBy, sortOrder, filters);
  }

  @Get('startups')
  @UseGuards(AuthGuard)
  async getStartups(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('offset', ParseIntPipe) offset: number,
    @Query('sortBy') sortBy: string,
    @Query('sortOrder') sortOrder: 'asc' | 'desc',
    @Query() filters: { [key: string]: string },
  ): Promise<Startup[]> {
    return this.userService.getStartups(limit, offset, sortBy, sortOrder, filters);
  }

  @Get('partners')
  @UseGuards(AuthGuard)
  async getPartners(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('offset', ParseIntPipe) offset: number,
    @Query('sortBy') sortBy: string,
    @Query('sortOrder') sortOrder: 'asc' | 'desc',
    @Query() filters: { [key: string]: string },
  ): Promise<Partner[]> {
    return this.userService.getPartners(limit, offset, sortBy, sortOrder, filters);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  async getMyProfile(@Request() req): Promise<User> {
    return this.userService.findUserById(req.user.id);
  }

  @Delete('profile')
  @UseGuards(AuthGuard)
  async deleteMyProfile(@Request() req): Promise<User> {
    return this.userService.deleteUserById(req.user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findUserById(id);
  }
}
