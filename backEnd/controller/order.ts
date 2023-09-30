

import OrderInterfce from "../application/interface/Order";
import UserClass from "../application/entities/user";

import {PrismaClient} from "@prisma/client"

const db = new PrismaClient();



export default class OrderController{

    private dependencies;

    constructor(deps: any){
        this.dependencies = deps;
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

    async create(data : OrderInterfce){
        try{
          

            const activeCartItems = await db.cart.findMany({
                where: {
                    userId: data.userId,
                    state: "inCart"
                }
            })

            const products: any = activeCartItems.map((cartItem: any) => {
                return {
                    productId: cartItem.productId,
                    quantity: cartItem.quantity
                }
            });

            const productPrices = await db.product.findMany({
                where: {
                  id: {
                    in: products.productId,
                  },
                },
              });
            

            // console.log(activeCartItems);
            // console.log(products);


            return await db.order.create({
                data
            })


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