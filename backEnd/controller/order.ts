

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
                },
                include: {
                    cart: true,
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

    async getOrders(){
        try{
            return await db.order.findMany({
                include: {
                    user: true,
                },
                where: {
                    user: {
                        deleted: 0
                    }
                }
                
            })
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

     formatDate(date: any) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
      
        return `${day}/${month}/${year}`;
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

            const now = new Date();
            const formattedDate = this.formatDate(now);

            const createdOrder = await db.order.create({
                data: {
                  userId: data.userId,
                  total: totalPrice,
                  state: "ordered",
                  date: formattedDate
                },
              });

              await db.cart.updateMany({
                where: { 
                    userId: data.userId,
                    state: "inCart",
                },
                data: {
                    state: "ordered",
                    orderId: createdOrder.id 
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

    async orderedCartItemsByOrderId(id : number){
        try{
            const order =  await db.cart.findMany({
                where: { 
                    orderId: id,
                 },
                // include: {
                //     cart: true,
                // }
              });

              console.log({order});
              return order;
        }
        catch(err: any){
            console.log(err);
        }

    }


    async orderedCartItemsOrderedByOrderId(){
        try{

                return await db.cart.findMany({
                    where: {
                        state: "ordered",
                        user: {
                            deleted: 0
                        } 
                    }
                });
                
        }
        catch(err: any){
            console.log(err);
        }

    }

}

