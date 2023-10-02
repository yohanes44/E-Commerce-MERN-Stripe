

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
        
        try{
            
            const user: any = await db.user.findUnique({
                where: {
                email: email
                }
            })
            

           if(!user){
            throw Error("User not found!");
           }

           const verifyPassword = await encryption.compare(user.password, password);

           if(!verifyPassword){
            throw Error("Password does not match!");
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

            const payload = {roles, firstName: user.firstName, lastName: user.lastName, email: user.email};


            const token = tokenGenerator.generate(payload, this.dependencies.appSecretKey);            
            
            return token;        
        }
        catch(err: any){
            console.log(err);
        }

    }

    async logOut(){

    }


}