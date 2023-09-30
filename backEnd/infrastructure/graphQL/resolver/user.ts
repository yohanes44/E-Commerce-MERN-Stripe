
import orm from "../../persistance/orm"

import UserController from "../../../controller/user"


class UserResolver {


    async getUser(parent: any, args: any, context: any) {
        return await context.controller.UserController.getUser(args.id);
    }

    async getUsers (parent: any, args: any, context: any) {
        return await context.controller.UserController.getUsers();
    }

    async addUser(parent: any, args: any, context: any) {
        return await context.controller.UserController.create(
            {
                firstName: args.firstName, lastName: args.lastName, email: args.email, password: args.password
            });
    }

    async updateUser(parent: any, args: any, context: any) {
        const { id, input } = args;
        return await context.controller.UserController.update(id, input);
    }

    async changeUserPassword(parent: any, args: any, context: any) {
        const { id, newpassword, oldpassword } = args;
        return await context.controller.UserController.changePassword(id, newpassword, oldpassword);
    }

    async deleteUser(parent: any, args: any, context: any) {
        const { id } = args;
        return await context.controller.UserController.delete(id);
    }    

}


export default new UserResolver();

