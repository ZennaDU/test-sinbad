import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from '../repository/order.repository';
import { AuthController } from '../../interfaces/controller/auth.controller';
import { AuthApplication } from 'src/application/auth.application';
import { UserService } from '../../domain/service/user.service';
import { UserRepository } from '../repository/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { JwtStrategy } from '../strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({
        defaultStrategy: 'jwt',
    }),
    JwtModule.register({
        secret: 'topsecret',
        signOptions: {
            expiresIn: 3600,
        }
    }),
    TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [AuthController],
  providers: [AuthApplication, UserService, JwtStrategy],
  exports: [
      JwtStrategy,
      PassportModule
  ]
})
export class AuthModule {}
