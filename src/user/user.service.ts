import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../databases/prisma.service';
import { Investor, Partner, Prisma, Startup, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {
  }

  async createUser(userInputData: Prisma.UserCreateInput): Promise<void> {
    const { email, password } = userInputData;
    const existingUser = await this.findOneByEmail(email);

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    userInputData = { ...userInputData, password: hashedPassword };

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


  private async createInvestor(userData: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        ...userData,
        role: 'INVESTOR',
        investor: {
          create: userData.investor as Prisma.InvestorCreateInput,
        },
      },
    });

    return user;
  }

  private async createStartup(userData: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        ...userData,
        role: 'STARTUP',
        startup: {
          create: userData.startup as Prisma.StartupCreateInput,
        },
      },
    });

    return user;
  }

  private async createPartner(userData: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        ...userData,
        role: 'PARTNER',
        partner: {
          create: userData.partner as Prisma.PartnerCreateInput,
        },
      },
    });

    return user;
  }


  async getInvestors(
    limit: number,
    offset: number,
    sortBy: string,
    sortOrder: 'asc' | 'desc',
    filters: { [key: string]: string | string[] },
  ): Promise<Investor[]> {
    const { take, skip, orderBy, where } = this.buildPrismaQueryParameters(limit, offset, sortBy, sortOrder, filters);
    return this.prisma.investor.findMany({ take, skip, orderBy, where });
  }

  async getStartups(
    limit: number,
    offset: number,
    sortBy: string,
    sortOrder: 'asc' | 'desc',
    filters: { [key: string]: string | string[] },
  ): Promise<Startup[]> {
    const { take, skip, orderBy, where } = this.buildPrismaQueryParameters(limit, offset, sortBy, sortOrder, filters);
    return this.prisma.startup.findMany({ take, skip, orderBy, where });
  }

  async getPartners(
    limit: number,
    offset: number,
    sortBy: string,
    sortOrder: 'asc' | 'desc',
    filters: { [key: string]: string | string[] },
  ): Promise<Partner[]> {
    const { take, skip, orderBy, where } = this.buildPrismaQueryParameters(limit, offset, sortBy, sortOrder, filters);
    return this.prisma.partner.findMany({ take, skip, orderBy, where });
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
