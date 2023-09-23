

import UserInterface from "../application/interface/User"

export default class Product{

    private firstName;
    private lastName;
    private email;
    private password;


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