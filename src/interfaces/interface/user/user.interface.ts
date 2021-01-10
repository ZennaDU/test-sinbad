export interface UserInterface{
    userId? :string;
    
    username?: string;
    
    password?: string;

    name: string;

    address: string;

    salt?: string;
}