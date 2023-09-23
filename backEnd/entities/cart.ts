

import CartInterface from "../application/interface/Cart"

export default class Cart{

    private productId;
    private userId;
    private orderId;
    private state;
    private quantity;
  
    constructor({  productId,
                   userId,
                   orderId,
                   state,
                   quantity
                }: CartInterface){
            
        this.productId = productId;
        this.userId = userId;
        this.orderId = orderId;
        this.state = state;
        this.quantity = quantity;
    }


}