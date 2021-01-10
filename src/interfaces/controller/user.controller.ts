import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { UserApplication } from '../../application/user.application';
import { CreateUserDto } from '../dto/User/create-user.dto';
import { UpdateUserDto } from '../dto/User/update-user.dto';
import { IdDto } from '../dto/Id.dto';
import { FilterUserDto } from '../dto/User/filter-user.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('user')
export class UserController {
    constructor(private userApplication: UserApplication){}

    @Post()
    @UsePipes(ValidationPipe)
    createUser(@Body() createUserDto: CreateUserDto){
        return this.userApplication.createUser(createUserDto);
    }

    @Patch()
    @UsePipes(ValidationPipe)
    updateUser(@Body() updateUserDto: UpdateUserDto){
        return this.userApplication.updateUser(updateUserDto);
    }

    @Delete()
    @UsePipes(ValidationPipe)
    delteUser(@Body() idDto: IdDto){
        return this.userApplication.deleteUser(idDto.id);
    }

    @Post("/filter")
    @UsePipes(ValidationPipe)
    getUsers(@Body() filterUserDto: FilterUserDto){
        return this.userApplication.getUsers(filterUserDto);
    }

    @Get('/:id')
    @UsePipes(ValidationPipe)
    getUserById(@Param('id', ParseUUIDPipe) id: string){
        return this.userApplication.getUserById(id);
    }
        
}