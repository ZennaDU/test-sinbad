import { ConflictException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import * as bycript from "bcrypt";
import { User } from "src/domain/entity/user.entity";
import { FilterUserInterface } from "src/interfaces/interface/user/user-filter.interface";
import { UserInterface } from "src/interfaces/interface/user/user.interface";
import { EntityRepository, Repository } from "typeorm";
import { SignInInterface } from '../../interfaces/interface/auth/signIn.interface';

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(userInterface: UserInterface): Promise<User>{
        const {username, password, name, address} = userInterface;
        
        const user = new User();
        user.username = username;
        user.salt = await bycript.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        user.name = name;
        user.address = address;

        try{            
            await user.save();
        }catch(error){
            throw new ConflictException(`User with Username "${username}" already exist`);
        }
        
        delete user.orders;
        return user;
    }

    async updateUser(userInterface: UserInterface): Promise<User>{
        const {name, address, userId} = userInterface;
        const user = await this.findOne( {userId} );
        
        if(!user){
            throw new NotFoundException(`User with ID "${userId}" not found`);
        }

        user.name = name;
        user.address = address;
        await user.save();

        
        delete user.orders;
        
        return user;
    }

    async getUsers(filterUserInterface: FilterUserInterface): Promise<User[]>{
        const {username, name, address} = filterUserInterface;
        const query = this.createQueryBuilder('user');
        
        if(username){
            query.andWhere('user.username ILIKE :username', {username: `%${username}%`});
        }

        if(name){
            query.andWhere('user.name ILIKE :name', {name: `%${name}%`});
        }

        if(address){
            query.andWhere('user.address ILIKE :address', {address: `%${address}%`});
        }
        
        const user = await query.getMany();
        return user;
    }

    private async hashPassword(password: string, salt: string): Promise<string>{
        return bycript.hash(password, salt);
    }

    async validatePassword(signInInterface: SignInInterface): Promise<string>{
        const {username, password} = signInInterface;
        const user = await this.findOne( {username} );
        if( user && await user.validatePassword(password)){
            return user.username;
        }else{
            throw new UnauthorizedException(`Invalid Credentials`);
        }
        
    }


}