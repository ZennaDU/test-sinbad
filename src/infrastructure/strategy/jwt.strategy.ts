import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from '../repository/user.repository';
import { JwtPayload } from "src/interfaces/interface/auth/jwt-payload.interface";
import { User } from "src/domain/entity/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'topsecret'
        });
    }

    async validate(payload: JwtPayload): Promise<User>{
        const { username } = payload;
        const user = await this.userRepository.findOne({username});

        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }
}