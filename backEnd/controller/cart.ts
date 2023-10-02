

import CartInterfce from "../application/interface/Cart";
import UserClass from "../application/entities/user";

import {PrismaClient} from "@prisma/client"

const db = new PrismaClient();



export default class CartController{

    private dependencies;
    private exception;

    constructor(deps: any, exception: any){
        this.dependencies = deps;
        this.exception = exception;
    }

    async getCartItem(id: number){
        try{
            return await db.cart.findUnique({
                where: {
                    id
                }
            })
        }
        catch(err: any){
            console.log(err);
        }
    }

    async getCartItems (userId: number) {
        try{
            return await db.cart.findMany({
                where: {
                    userId,
                    state: "inCart"
                }
            })
        }
        catch(err: any){
            console.log(err);
        }
    }

    async addCartItem(data : CartInterfce){
        
        try{

            const existingProduct = await db.cart.findFirst({
                where: {
                  productId: data.productId,
                  userId: data.userId
                },
              });
            if(existingProduct){
                // update quantity of the cartItem by one
                return await db.cart.update({
                    where: {
                      id: existingProduct.id,
                    },
                    data: {
                      quantity: existingProduct.quantity + data.quantity
                    }
                  });
            }

            return await db.cart.create({
                data: {
                    productId: data.productId,
                    userId: data.userId,
                    state: "inCart",
                    quantity: data.quantity
                }
            })
            
        }
        catch(err: any){
            console.log(err);
        }

    }

    async updateQuantity(id: any, quantity : any){    
        try{
            return await db.cart.update({
                where: { 
                    id
                },
                data: {
                    quantity
                },
            });
        }
        catch(err: any){
            console.log(err);
        }
    }

    async deleteCartItem(id : number){
        
        try{
            const deletedUser = await db.cart.delete({
                where: { 
                    id
                },
              });

            return deletedUser;
        }
        catch(err: any){
            console.log(err);
        }

    }

    async clearCart(userId : number){
        
        try{
            const deletedUser = await db.cart.deleteMany({
                where: { 
                    userId,
                    state: "inCart"
                },
              });

            return deletedUser;
        }
        catch(err: any){
            console.log(err);
        }

    }

}