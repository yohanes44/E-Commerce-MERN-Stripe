
class OrderResolver {

    async getOrder(parent: any, args: any, context: any) {    
        return await context.controller.OrderController.getOrder(args.id);
    }

    async getOrdersByState(parent: any, args: any, context: any) {
        return await context.controller.OrderController.getOrdersByState(args.state);
    }

    async getOrders(parent: any, args: any, context: any) {    
        return await context.controller.OrderController.getOrders();
    }

    async getUserOrders(parent: any, args: any, context: any) {
        return await context.controller.OrderController.getOrder(args.userId);
    }

    async getUserOrdersByState(parent: any, args: any, context: any) {
        return await context.controller.OrderController.getOrder(args.userId, args.state);
    }

    async create(parent: any, args: any, context: any) {
        return await context.controller.OrderController.create(args);
    }

    async update(parent: any, args: any, context: any) {
        return await context.controller.OrderController.update(args.id, args.input);
    }

    async delete(parent: any, args: any, context: any) {
        return await context.controller.OrderController.delete(args.id);
    }

}


export default new OrderResolver()
