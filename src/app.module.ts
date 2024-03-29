import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { JwtService } from '@nestjs/jwt';
import { PackagesModule } from 'src/admin/packages/packages.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProgramModule } from 'src/program/program.module';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { GadgetsModule } from './gadgets/gadgets.module';
import { NewsModule } from './news/news.module';
import { BonusModule } from './bonus/bonus.module';
import { SuggestionModule } from './suggestion/suggestion.module';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.APP_MODE !== 'PRODUCTION',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    ClientModule,
    PackagesModule,
    ProgramModule,
    NewsModule,
    GadgetsModule,
    BonusModule,
    SuggestionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    UsersService,
    JwtAuthGuard,
    JwtService,
  ],
})
export class AppModule {}
