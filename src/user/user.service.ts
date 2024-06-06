import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../databases/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from './dto/user-create.dto';
import { InvestorCreateDto } from './dto/investor-create.dto';
import { StartupCreateDto } from './dto/startup-create.dto';
import { PartnerCreateDto } from './dto/partner-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {
  }

  async createUser(userInputData: UserCreateDto, profileImage?: Express.Multer.File): Promise<void> {
    const { email, password } = userInputData;
    const existingUser = await this.findOneByEmail(email);

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    userInputData = { ...userInputData, password: hashedPassword };

    if (profileImage) {
      userInputData.profileImage = `uploads/profile-images/${profileImage.filename}`;
    }
    console.log(userInputData.profileImage);

    const { role } = userInputData;

    if (role === 'INVESTOR') {
      await this.createInvestor(userInputData);
    } else if (role === 'STARTUP') {
      await this.createStartup(userInputData);
    } else if (role === 'PARTNER') {
      await this.createPartner(userInputData);
    } else {
      throw new BadRequestException('Invalid user role');
    }
  }

  private async createInvestor(userData: UserCreateDto): Promise<User> {
    const investorData = userData.investor as InvestorCreateDto;

    const user = await this.prisma.user.create({
      data: {
        email: userData.email,
        password: userData.password,
        role: 'INVESTOR',
        profileImage: userData.profileImage,
        investor: {
          create: investorData,
        },
      },
    });

    return user;
  }

  private async createStartup(userData: UserCreateDto): Promise<User> {
    const startupData = userData.startup as StartupCreateDto;

    const user = await this.prisma.user.create({
      data: {
        email: userData.email,
        password: userData.password,
        role: 'STARTUP',
        profileImage: userData.profileImage,
        startup: {
          create: startupData,
        },
      },
    });

    return user;
  }

  private async createPartner(userData: UserCreateDto): Promise<User> {
    const partnerData = userData.partner as PartnerCreateDto;

    const user = await this.prisma.user.create({
      data: {
        email: userData.email,
        password: userData.password,
        role: 'PARTNER',
        profileImage: userData.profileImage,
        partner: {
          create: partnerData,
        },
      },
    });

    return user;
  }

  async updateUser(userId: number, userInputData: UserUpdateDto, profileImage?: Express.Multer.File): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (userInputData.password) {
      userInputData.password = await bcrypt.hash(userInputData.password, 10);
    }

    if (profileImage) {
      userInputData.profileImage = `uploads/profile-images/${profileImage.filename}`;
    }

    const updateData: any = {
      email: userInputData.email,
      password: userInputData.password,
      profileImage: userInputData.profileImage,
    };

    if (user.role === 'INVESTOR' && userInputData.investor) {
      updateData.investor = {
        update: userInputData.investor,
      };
    } else if (user.role === 'STARTUP' && userInputData.startup) {
      updateData.startup = {
        update: userInputData.startup,
      };
    } else if (user.role === 'PARTNER' && userInputData.partner) {
      updateData.partner = {
        update: userInputData.partner,
      };
    } else {
      throw new BadRequestException('Invalid user role');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
  }

  async getInvestors(
    limit: number,
    offset: number,
    sortBy: string,
    sortOrder: 'asc' | 'desc',
    filters: { [key: string]: string | string[] },
  ): Promise<any[]> {
    const { take, skip, orderBy, where } = this.buildPrismaQueryParameters(limit, offset, sortBy, sortOrder, filters);
    const investors = await this.prisma.investor.findMany({
      take,
      skip,
      orderBy,
      where,
      include: {
        user: {
          select: {
            profileImage: true,
          },
        },
      },
    });

    return investors.map(investor => ({
      ...investor,
      profileImage: investor.user.profileImage,
      user: undefined, // Remove user object from the response
    }));
  }


  async getStartups(
    limit: number,
    offset: number,
    sortBy: string,
    sortOrder: 'asc' | 'desc',
    filters: { [key: string]: string | string[] },
  ): Promise<any[]> {
    const { take, skip, orderBy, where } = this.buildPrismaQueryParameters(limit, offset, sortBy, sortOrder, filters);
    const startups = await this.prisma.startup.findMany({
      take,
      skip,
      orderBy,
      where,
      include: {
        user: {
          select: {
            profileImage: true,
          },
        },
      },
    });

    return startups.map(startup => ({
      ...startup,
      profileImage: startup.user.profileImage,
      user: undefined, // Remove user object from the response
    }));
  }


  async getPartners(
    limit: number,
    offset: number,
    sortBy: string,
    sortOrder: 'asc' | 'desc',
    filters: { [key: string]: string | string[] },
  ): Promise<any[]> {
    const { take, skip, orderBy, where } = this.buildPrismaQueryParameters(limit, offset, sortBy, sortOrder, filters);
    const partners = await this.prisma.partner.findMany({
      take,
      skip,
      orderBy,
      where,
      include: {
        user: {
          select: {
            profileImage: true,
          },
        },
      },
    });

    return partners.map(partner => ({
      ...partner,
      profileImage: partner.user.profileImage,
      user: undefined, // Remove user object from the response
    }));
  }


  buildPrismaQueryParameters(
    limit: number,
    offset: number,
    sortBy: string,
    sortOrder: 'asc' | 'desc',
    filters: { [key: string]: string | string[] },
  ) {
    let orderBy = {};
    if (sortBy) {
      orderBy[sortBy] = sortOrder;
    }

    let where = {};
    const arrayFields = ['links', 'type', 'proposals', 'contacts'];

    for (const filter in filters) {
      if (['limit', 'offset', 'sortBy', 'sortOrder'].includes(filter)) {
        continue; // Skip pagination and sorting parameters
      }

      const isFilterArray = Array.isArray(filters[filter]);
      const isFieldArray = arrayFields.includes(filter);

      if (filter === 'name') {
        where[filter] = {
          contains: filters[filter],
          mode: 'insensitive',
        };
      }
      // If both the filter value and the field are arrays, use a hasSome filter
      else if (isFilterArray && isFieldArray) {
        where[filter] = {
          hasSome: filters[filter],
        };
      }
      // If the filter value is not an array but the field is, use a has filter
      else if (!isFilterArray && isFieldArray) {
        where[filter] = {
          has: filters[filter],
        };
      }
      // If the filter value is an array but the field is not, use an in filter
      else if (isFilterArray && !isFieldArray) {
        where[filter] = {
          in: filters[filter],
        };
      } else if (filter === 'minTicketSizeMin') {
        where['minTicketSize'] = {
          gte: parseFloat(<string>filters[filter]),
        };
      } else if (filter === 'maxTicketSizeMin') {
        where['maxTicketSize'] = {
          gte: parseFloat(<string>filters[filter]),
        };
      } else {
        where[filter] = filters[filter];
      }
    }

    return { take: limit, skip: offset, orderBy, where };
  }

  async findUserById(id: number): Promise<User | null> {
    const userExist = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userExist) return null;
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: this.dynamicIncludeByRole(userExist),
    });

    delete user.password;

    return user;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  dynamicIncludeByRole(user: User) {
    let includeObj = {};
    switch (user.role) {
      case 'INVESTOR':
        includeObj = { investor: true };
        break;
      case 'STARTUP':
        includeObj = { startup: true };
        break;
      case 'PARTNER':
        includeObj = { partner: true };
        break;
    }

    return includeObj;
  }

  async deleteUserById(id: number): Promise<User> {
    const userExist = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userExist) return null;
    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });

    delete deletedUser.password;
    return deletedUser;
  }
}
