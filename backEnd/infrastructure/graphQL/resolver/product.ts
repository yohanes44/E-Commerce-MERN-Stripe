
import orm from "../../persistance/orm"



class ProductResolver{

    async getProduct (parent: any, args: any, context: any){
        return await context.controller.ProductController.getProduct(args.id);
    }

    async getProducts (parent: any, args: any, context: any){
        return await context.controller.ProductController.getProducts(args.category);
    }

    async create(parent: any, args: any, context: any){
        return await context.controller.ProductController.create(args);
    } 

    async update (parent: any, args: any, context: any){
        return await context.controller.ProductController.update(args.id, args.input);
    } 

    async delete (parent: any, args: any, context: any){
        return await context.controller.ProductController.delete(args.id);
    }
}


export default new ProductResolver()





