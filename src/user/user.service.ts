import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../databases/prisma.service";
import { Prisma, User } from "@prisma/client";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {
  }

  async createUser(userInputData: Prisma.UserCreateInput): Promise<User> {
    const { role } = userInputData;

    if (role === "INVESTOR") {
      return this.createInvestor(userInputData);
    } else if (role === "STARTUP") {
      return this.createStartup(userInputData);
    } else if (role === "PARTNER") {
      return this.createPartner(userInputData);
    } else {
      throw new BadRequestException("Invalid user role");
    }
  }


  private async createInvestor(userData: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        ...userData,
        role: "INVESTOR",
        investor: {
          create: userData.investor as Prisma.InvestorCreateInput
        }
      }
    });

    return user;
  }

  private async createStartup(userData: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        ...userData,
        role: "STARTUP",
        startup: {
          create: userData.startup as Prisma.StartupCreateInput
        }
      }
    });

    return user;
  }

  private async createPartner(userData: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        ...userData,
        role: "PARTNER",
        partner: {
          create: userData.partner as Prisma.PartnerCreateInput
        }
      }
    });

    return user;
  }

  async findUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id
      }
    });
  }
}
