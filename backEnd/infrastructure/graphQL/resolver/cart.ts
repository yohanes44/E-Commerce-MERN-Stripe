
import orm from "../../persistance/orm"



class CartResolver{


    async getCartItem(parent: any, args: any, context: any){
        return await context.controller.CartController.getCartItem(args.id);
    }

    async getCartItems(parent: any, args: any, context: any){
        return await context.controller.CartController.getCartItems(args.userId);
    }

    async addCartItem(parent: any, args: any, context: any){
        return await context.controller.CartController.addCartItem(args);
    }

    async updateCartItemQuantity(parent: any, args: any, context: any){
        return await context.controller.CartController.updateQuantity(args.id, args.quantity);
    }

    async deleteCartItem(parent: any, args: any, context: any){
        return await context.controller.CartController.deleteCartItem(args.id);
    }

    async clearCart(parent: any, args: any, context: any){
        return await context.controller.CartController.clearCart(args.userId);
    }
    
}


export default new CartResolver();

