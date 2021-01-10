import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthApplication } from '../../application/auth.application';
import { SignInDto } from '../dto/Auth/signIn.dto';
import { GetUser } from '../decorator/get-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authApplication: AuthApplication){}

    @Post('/signin')
    @UsePipes(ValidationPipe)
    signIn(@Body() signInDto: SignInDto): Promise<{accessToken: string}>{
        return this.authApplication.signIn(signInDto);
    }
}