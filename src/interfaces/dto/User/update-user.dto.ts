import {IsNotEmpty, IsUUID} from 'class-validator';

export class UpdateUserDto{
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    address: string;
}