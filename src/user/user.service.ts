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
    const existingUser = await this.findOne(email);

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


  async getInvestors(limit: number, offset: number): Promise<Investor[]> {
    return this.prisma.investor.findMany({
      take: limit,
      skip: offset,
    });
  }

  async getStartups(limit: number, offset: number): Promise<Startup[]> {
    return this.prisma.startup.findMany({
      take: limit,
      skip: offset,
    });
  }

  async getPartners(limit: number, offset: number): Promise<Partner[]> {
    return this.prisma.partner.findMany({
      take: limit,
      skip: offset,
    });
  }

  async findUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
