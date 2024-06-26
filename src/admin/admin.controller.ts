import {
  BadRequestException,
  Body,
  Controller, Delete,
  Get,
  Patch, Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../config/multer-options';
import { UserUpdateDto } from '../user/dto/user-update.dto';
import { User } from '@prisma/client';
import { UserService } from '../user/user.service';

@Controller('admin')
@UseGuards(AuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly userService: UserService) {
  }

  @Patch('users/profile')
  @Roles(['ADMIN'])
  @UseInterceptors(FileInterceptor('profileImage', multerOptions))
  async updateUser(
    @Query('id') id: number,
    @Query('email') email: string,
    @Body() userData: UserUpdateDto,
    @UploadedFile() profileImage?: Express.Multer.File,
  ): Promise<User> {
    if (!id && !email) {
      throw new BadRequestException('Either id or email must be provided');
    }

    return this.userService.updateUserByIdentifier({ id, email }, userData, profileImage);
  }

  @Post('users/make-admin')
  @Roles(['ADMIN'])
  async makeUserAdmin(@Query('id') userId: number): Promise<User> {
    if (!userId) {
      throw new BadRequestException('User ID must be provided');
    }

    return this.userService.makeUserAdmin(userId);
  }

  @Delete('users')
  @Roles(['ADMIN'])
  async deleteUser(@Query('id') userId: number): Promise<User> {
    if (!userId) {
      throw new BadRequestException('User ID must be provided');
    }
    return this.userService.deleteUserById(userId);
  }

  @Get()
  @Roles(['ADMIN'])
  checkAdmin() {
    return 'This route is restricted to admins only';
  }
}
