import { Injectable } from '@nestjs/common';    
import { User } from 'src/domain/entity/user.entity';
import { UserService } from '../domain/service/user.service';
import { UserInterface } from 'src/interfaces/interface/user/user.interface';
import { FilterUserInterface } from 'src/interfaces/interface/user/user-filter.interface';

@Injectable()
export class UserApplication{
    constructor(private userService: UserService){}
    
    async createUser(userInterface: UserInterface): Promise<User> {
        return this.userService.createUser(userInterface)
    }

    async deleteUser(id: string): Promise<void> {
        return this.userService.deleteUser(id)
    }

    async updateUser(userInterface: UserInterface): Promise<User> {
        return this.userService.updateUser(userInterface)
    }

    async getUsers(filterUserInterface: FilterUserInterface): Promise<User[]> {
        return this.userService.getUsers(filterUserInterface)
    }

    async getUserById(id: string): Promise<User> {
        return this.userService.getUserById(id)
    }    
}