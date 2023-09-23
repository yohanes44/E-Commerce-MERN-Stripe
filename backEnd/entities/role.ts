

import RoleInterface from "../application/interface/Role"

export default class Order{

    private name;
    constructor({  name,
                }: RoleInterface){
            
        this.name = name;
    }


}