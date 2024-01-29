import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { DataBaseOrderRepository } from './order.repository';
import { DataBasePetProductRepository } from './pet-product.repository';
import { DataBaseUserRepository } from './user.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    DataBaseOrderRepository,
    DataBasePetProductRepository,
    DataBaseUserRepository,
  ],
})
export class RepositoriesModule {}
