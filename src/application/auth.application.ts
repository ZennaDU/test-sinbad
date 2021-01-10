import { Injectable } from '@nestjs/common';    
import { UserService } from '../domain/service/user.service';
import { SignInInterface } from '../interfaces/interface/auth/signIn.interface';

@Injectable()
export class AuthApplication{
    constructor(private userService: UserService){}
    
    async signIn(signInInterface: SignInInterface): Promise<{accessToken: string}>{
        return this.userService.validatePassword(signInInterface)
    }    
}