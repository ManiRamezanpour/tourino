import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { JwtService } from '@nestjs/jwt';
import { PackagesModule } from 'src/admin/packages/packages.module';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/guard/auht.guard';
import { GroupsModule } from 'src/groups/groups.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { ClientModule } from '../client/client.module';
import { AppController } from '../controllers/app.controller';
import { PaymentModule } from '../payment/payment.module';
import { AppService } from '../providers/app.service';

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
    PaymentModule,
    PackagesModule,
    GroupsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, UsersService, AuthGuard, JwtService],
})
export class AppModule {}
