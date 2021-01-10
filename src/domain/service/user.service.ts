import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../../infrastructure/repository/user.repository';
import { User } from '../entity/user.entity';
import { UserInterface } from 'src/interfaces/interface/user/user.interface';
import { SignInInterface } from '../../interfaces/interface/auth/signIn.interface';
import { FilterUserInterface } from 'src/interfaces/interface/user/user-filter.interface';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/interfaces/interface/auth/jwt-payload.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtservice: JwtService
  ){}

  async getUserById(id: string): Promise<User>{
    const user = await this.userRepository.findOne(id);
    if(!user){
        throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;    
  }

  async createUser(userInterface: UserInterface): Promise<User> {
    return this.userRepository.createUser(userInterface)
  }

  async deleteUser(id: string): Promise<void>{
    const result = await this.userRepository.delete(id);

    if(result.affected === 0){
        throw new NotFoundException(`Promotion with ID "${id}" not found`);
    }
  }

  async updateUser(userInterface: UserInterface): Promise<User> {
    return this.userRepository.updateUser(userInterface)
  }

  async getUsers(filterUserInterface: FilterUserInterface): Promise<User[]> {
    return this.userRepository.getUsers(filterUserInterface)
  }

  async validatePassword(signInInterface: SignInInterface): Promise<{accessToken: string}>{
    const username = await this.userRepository.validatePassword(signInInterface);
    const payload:JwtPayload = { username};
    const accessToken = await this.jwtservice.sign(payload);

    return {accessToken};

  }

}