
import { Request, Response } from "express";


import jwt, {JwtPayload} from "jsonwebtoken"


export default class AuthMiddleware {

    private appSecretKey;

    constructor(key: any) {
        this.appSecretKey = key;
    }
 

    public authenticate(): ((req: any, res: any, next: any) => Promise<void>) {
        return async (req: any, res: any, next: any): Promise<void> => {
           


            try {
                
                const token = req.headers.authorization.split(" ")[1];


                const user = jwt.verify(token, this.appSecretKey);/* as JwtPayload*/;
                req.user = user;

            }
            catch (err: any) {  
                console.log(err);
                
            }
    
            next();
    
        }
    }

}
