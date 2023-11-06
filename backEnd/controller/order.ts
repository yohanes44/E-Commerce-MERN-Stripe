

import OrderInterfce from "../application/interface/Order";
import UserClass from "../application/entities/user";

import {PrismaClient} from "@prisma/client"

const db = new PrismaClient();



export default class OrderController{

    private dependencies;
    private exception;

    constructor(deps: any, exception: any){
        this.dependencies = deps;
        this.exception = exception;
    }


    async getOrder(id: any){
        try{
            return await db.order.findUnique({
                where: {
                    id: id
                }
            })}
        catch(err: any){
            console.log(err);
        }
    }

    async getOrdersByState (state: string) {
        try{
            return await db.order.findMany({
                where: {
                    state
                }
            })
        }
        catch(err: any){
            console.log(err);
        }
    }

    async getOrders(id: any){
        try{
            return await db.order.findMany()
        }
        catch(err: any){
            console.log(err);
        }
    }

   
    async getUserOrders(userId: number) {
        try{
            return await db.order.findMany({
                where: {
                    userId
                }
            })
        }
        catch(err: any){
            console.log(err);
        }
    }

    async getUserOrdersByState(userId: number, state: string) {
        try{
            return await db.order.findMany({
                where: {
                    userId,
                    state
                }
            })
        }
        catch(err: any){
            console.log(err);
        }
    }

    async create(data : any){
        try{
          

            const cartItems = await db.cart.findMany({
                where: {
                    userId: data.userId,
                    state: "inCart"
                },
                include: {
                   product: true,
                   user: true
                }
            })

            if (!cartItems || cartItems.length === 0) {
                throw new Error('Cart is empty. Cannot create an order.');
            }

            const totalPrice = cartItems.reduce(
                (total, cartItem) => total + cartItem.product.price * cartItem.quantity,
                0
            );

            const createdOrder = await db.order.create({
                data: {
                  userId: data.userId,
                  total: totalPrice,
                  state: "ordered"
                },
              });

              await db.cart.updateMany({
                where: { 
                    userId: data.userId,
                    state: "inCart" 
                },
                data: {
                    state: "ordered"
                }
              });
      
              return createdOrder;

        }
        catch(err: any){
            console.log(err);
        }
    }

    async update(id: any, input : any){
        
        try{
            return await db.order.update({
                where: { 
                    id
                },
                data: input,
              });
        }
        catch(err: any){
            console.log(err);
        }

    }

    async delete(id : number){
        
        try{
            return await db.order.delete({
                where: { id },
              });
        }
        catch(err: any){
            console.log(err);
        }

    }



}