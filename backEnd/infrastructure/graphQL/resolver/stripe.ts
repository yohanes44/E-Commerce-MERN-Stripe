
import orm from "../../persistance/orm"

import UserController from "../../../controller/user"

import Stripe from "stripe"

// const stripe = new Stripe("sk_test_51LwXhNFGqQ7awyAKHlhFIarqvyWNUzPV1XRxdbsUZD0wyHgabXdRGPvWG1dhVvI7LpqAAdwzx4inFB1cOviCUL1a00K1WT2stM", {
//     apiVersion: '2023-08-16',
// })

class PaymenyResolver {

    private stripe: Stripe = new Stripe("sk_test_51LwXhNFGqQ7awyAKHlhFIarqvyWNUzPV1XRxdbsUZD0wyHgabXdRGPvWG1dhVvI7LpqAAdwzx4inFB1cOviCUL1a00K1WT2stM", {
        apiVersion: '2023-08-16',
    })

    async pay(parent: any, args: any, context: any) {

        this.stripe.charges.create(
            {
                source: args.tokenId,
                amount: args.amount,
                currency: "usd"
            },
            (stripeErr, stripeRes)=>{
                if(stripeErr){
                    return stripeErr
                }
                return stripeRes
            }
        )
        

        // return await context.controller.UserController.getUser(args.id);
    }

   
}


export default new PaymenyResolver();

