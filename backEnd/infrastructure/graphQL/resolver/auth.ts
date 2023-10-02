

import AuthController from "../../../controller/auth"


class AuthResolver{

    constructor(){

    }

    async login(parent: any, args: any, context: any){
          return await context.controller.AuthController.login(args); 
     }


}

export default new AuthResolver()


