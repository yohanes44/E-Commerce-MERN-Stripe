

import AuthController from "../../../controller/auth"


class AuthResolver{

    constructor(){

    }

    async login(parent: any, args: any, context: any){
        
        const {
             validation, appSecretKey, appAddress
        } = context.dependencies;

        const authController = new AuthController({
             validation, appSecretKey, appAddress
        });

        const token = await authController.login({email: args.email, password: args.password});
        return {token}  
}


}

export default new AuthResolver()


