

import OrderInterface from "../interface/Order"

export default class Order{

    private state;
    private userId;
    private city;
    private sub_city;
    private phone;
  
    constructor({  state,
                   userId,
                   city,
                   sub_city,
                   phone
                }: OrderInterface){
            
        this.state = state;
        this.userId = userId;
        this.city = city;
        this.sub_city = sub_city;
        this.phone = phone;
        
    }


}