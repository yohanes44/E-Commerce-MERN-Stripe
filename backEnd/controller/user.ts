

import UserInterfce from "../application/interface/User";
import UserClass from "../application/entities/user";

import {PrismaClient} from "@prisma/client"

const db = new PrismaClient();



export default class UserController{

    private dependencies;

    constructor(deps: any){
        this.dependencies = deps;
    }


    async getUser(id: any){
        try{
            return await db.user.findUnique({
                where: {
                    id: id
                }
            })}
        catch(err: any){
            console.log(err);
        }
    }

    async getUsers () {
        try{
            return await db.user.findMany()
        }
        catch(err: any){
            console.log(err);
        }
    }

    async create({ firstName, lastName, email, password } : UserInterfce){
        
        try{
            
            const userExistance = await db.user.findUnique({
                where: {
                email: email
                }
            })

            if(userExistance){
                throw Error("User already exists with this email");
            }

            // console.log(this.dependencies)

            // console.log("testtt 1")

            const hashedPassword = await this.dependencies.get("encryption").hash(password);
            // console.log("testtt 2")
            
            // console.log({hashedPassword})
            const userInstance = new UserClass({firstName, lastName, email, password});

            const user = await db.user.create({
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,    
                    password: hashedPassword
                },
            })
            
            return user
        }
        catch(err: any){
            console.log(err);
        }

    }

    async update(id: any, input : any){
        
        try{
            if(input.password){
                input.password = await this.dependencies.get("encryption").hash(input.password);
            }

            return await db.user.update({
                where: { 
                    id
                },
                data: input,
              });
        }
        catch(err: any){
            console.log(err);
        }

    }

    async delete(id : number){
        
        try{
            const deletedUser = await db.user.delete({
                where: { id },
              });

            return deletedUser;
        }
        catch(err: any){
            console.log(err);
        }

    }



}