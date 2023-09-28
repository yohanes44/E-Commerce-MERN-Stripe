
import orm from "../../persistance/orm"

 class roleResolver{

    async getRole(parent: any, args: any, context: any) {
        return await context.controller.RoleController.getRole(args.id);
    }

    async getRoles(parent: any, args: any, context: any) {
        return await context.controller.RoleController.getRoles();
    }

    async addRole (parent: any, args: any, context: any){
        return await context.controller.RoleController.addRole(args);
    }

    async updateRole (parent: any, args: any, context: any){
        return await context.controller.RoleController.updateRole(args.id, args.input);
    }

    async deleteRole (parent: any, args: any, context: any){
        return await context.controller.RoleController.deleteRole(args.id);
    }

    async getUserRole (parent: any, args: any, context: any){
        return await context.controller.RoleController.getUserRole(args.userId);
    }

    async addUserRole (parent: any, args: any, context: any){
        return await context.controller.RoleController.addUserRole(args);
    }

    async deleteUserRole (parent: any, args: any, context: any){
        return await context.controller.RoleController.deleteUserRole(args);
    }

}


export default new roleResolver();




        