import { UserModel, UserRole } from '@/domain/model';
import { UserRepository } from '@/domain/repositories/user-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DataBaseUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}
  async getUserByEmail(email: string): Promise<UserModel> {
    const user = await this.prisma.user.findFirst({ where: { email } });
    return { ...user, role: user.role as UserRole };
  }
  async updateRefreshToken(email: string, refreshToken: string): Promise<void> {
    await this.prisma.user.update({
      where: { email },
      data: { Session: { update: { refresh_token: refreshToken } } },
    });
  }
}
