

class AuthResolver{

    constructor(){

    }

    async login(parent: any, args: any, context: any){

          const user = await context.controller.AuthController.login(args);
          return user; 
     }


}

export default new AuthResolver()


