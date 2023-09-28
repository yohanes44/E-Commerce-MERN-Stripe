



class CategoryResolver {

    async getCategory(parent: any, args: any, context: any) {    
        return await context.controller.CategoryController.getCategory(args.id);
    }

    async getCategories(parent: any, args: any, context: any) {    
        return await context.controller.CategoryController.getCategories();
    }

    async create(parent: any, args: any, context: any) {
        return await context.controller.CategoryController.create(args);
    }

    async update(parent: any, args: any, context: any){
        return await context.controller.CategoryController.update(args.id, args.input);
    }

    async delete(parent: any, args: any, context: any){
        return await context.controller.CategoryController.delete(args.id);
    }

}


export default new CategoryResolver()
