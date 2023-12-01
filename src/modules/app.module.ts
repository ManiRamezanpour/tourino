import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersController } from 'src/users/users.controller';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../providers/app.service';
import { ClientService } from '../client/client.service';
import {ClientController} from "../client/client.controller";
import {ClientModule} from "../client/client.module";
import {PaymentModule} from "../payment/payment.module";

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
      ClientModule,
      PaymentModule
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, PrismaService, UsersService, AuthGuard, JwtService],
})
export class AppModule {}
