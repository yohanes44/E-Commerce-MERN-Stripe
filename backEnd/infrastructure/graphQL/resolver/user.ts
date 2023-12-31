
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
                firstName: args.firstName, 
                lastName: args.lastName, 
                email: args.email,
                img: args.img, 
                phoneNumber: parseInt(args.phoneNumber),  
                
                city: args.city, 
                sub_city: args.sub_city,

                password: args.password, 
                repeatPassword: args.repeatPassword, 
            }, context.controller.AuthController);

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

    async addAddress(parent: any, args: any, context: any) {
        const { userId, phoneNumber, city, sub_city } = args;
        return await context.controller.UserController.addAddress(userId, phoneNumber, city, sub_city);
    }    

}


export default new UserResolver();

