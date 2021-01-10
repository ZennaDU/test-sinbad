import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../repository/user.repository';
import { UserController } from '../../interfaces/controller/user.controller';
import { UserApplication } from '../../application/user.application';
import { UserService } from '../../domain/service/user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
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
  controllers: [UserController],
  providers: [UserApplication,UserService,JwtStrategy],
  exports: [
    JwtStrategy,
    PassportModule
  ]
})
export class UserModule {}
