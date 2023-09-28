

import UserRoleInterface from "../interface/UserRole"

export default class Product{

    private userId;
    private roleId;  


    constructor({  userId,
                   roleId,
               }: UserRoleInterface){
            
        this.userId = userId;
        this.roleId = roleId;
    }


}