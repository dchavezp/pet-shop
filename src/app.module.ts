import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { Cloudinary } from './infrastructure/cloudinary/cloudinary.provider';
import { CloudinaryService } from './infrastructure/cloudinary/cloudinary.service';
import { CloudinaryModule } from './infrastructure/cloudinary/cloudinary.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    EnvironmentConfigModule,
    LoggerModule,
    ExceptionsModule,
    RepositoriesModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService, Cloudinary, CloudinaryService],
})
export class AppModule {}
