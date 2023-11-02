

import LoginInterfce from "../application/interface/Login"
import EncryptionService from "../infrastructure/service/authentication/encryption"
import TokenGeneratorService from "../infrastructure/service/authentication/tokenGenerator"

import {PrismaClient} from "@prisma/client"

const db = new PrismaClient();


const encryption = new EncryptionService();
const tokenGenerator = new TokenGeneratorService();


export default class AuthController{


    private dependencies;
    private exception;

    constructor(deps: any, exception: any){
        this.dependencies = deps;
        this.exception = exception;
    }

    async login({ email, password } : LoginInterfce){

        // console.log("args");
        // console.log({email, password});

        
        try{
            
            
            const user: any = await db.user.findFirst({
                where: {
                    email: email
                }
            })
            
            // const user: any = await db.user.findUnique({
            //     where: {
            //         id: userAddress.userId
            //     }
            // })
            

           if(!user){
            throw new this.exception("auth0001");
           }

           const verifyPassword = await this.dependencies.get("encryption").compare(user.password, password);

           if(!verifyPassword){
                throw new this.exception("auth0003");
           }

           const userRoles = await db.user_role.findMany({
                where: {
                    userId: user?.id
                },
            })

            const roleIds = userRoles.map((userRole: any) => userRole.roleId);

            const roleCollection = await db.role.findMany({
                where: {
                id: {
                    in: roleIds,
                },
                },
            });

            const roles = roleCollection.map((role: any) => role.name);

            const payload = {roles, firstName: user.firstName, lastName: user.lastName, email: user.email, id: user.id};


            const token =  tokenGenerator.generate(payload, this.dependencies.get("appSecretKey"));
    
            return {
                token,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }
        }
        catch(err: any){
            console.log(err);
            if (err instanceof this.exception) {
                throw err;
            } else {
                throw new this.exception("db0001");
            }
        }

    }

    async logOut(){

    }


}