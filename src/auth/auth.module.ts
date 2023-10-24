import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { RolesGuard } from './guards/roles.guard';
import { User } from '../entity/user.entity'; // Import your User entity

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'my-token',
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([User]), // Provide the User repository here
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: 'ALLOWED_ROLES',
      useValue: ['admin'], // Define your allowed roles here
    },
    RolesGuard,
  ],
  exports: [AuthService],
})
export class AuthModule {}
