

import UserInterface from "../interface/User"

export default class User{

    public firstName;
    public lastName;
    public email;
    public password;


    constructor({  firstName,
                   lastName,
                   email,
                   password,
                }: UserInterface){  
            
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }


}