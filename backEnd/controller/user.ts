

import UserInterfce from "../application/interface/User";
import UserClass from "../application/entities/user";

import { PrismaClient } from "@prisma/client"
import JoException from "../infrastructure/Exceptions/JoException";

const db = new PrismaClient();





export default class UserController {

    private dependencies;
    private exception;

    constructor(deps: any, exception: any){
        this.dependencies = deps;
        this.exception = exception;
    }


    async getUser(id: any) {
     
        try {
            const user = await db.user.findUnique({
                where: {
                    id: id
                }
            })
            if(!user){
                throw new this.exception("user0001");
            }  
            return user
        }
        catch (err: any) {
            if (err instanceof this.exception) {
                throw err;
            } else {
                throw new this.exception("db0001");
            }
      }
    }

    async getUsers() {
        try {
            return await db.user.findMany()
        }
        catch (err: any) {
            throw new this.exception("db0001");
        }
    }

    async create({ firstName, lastName, email, password, phoneNumber, city = "A.A", sub_city = "Bole" }: { firstName: string, lastName: string, email: string, password: string, phoneNumber: number, city: string, sub_city: string }) {

        try {

            const user = await db.user.findFirst({
                where: {
                    email: email
                }
            })


            if (user) {
                throw new this.exception("user0002");
            }

            const hashedPassword = await this.dependencies.get("encryption").hash(password);

            // const userInstance = new UserClass({ firstName, lastName, email, password });

            const newUser = await db.user.create({
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    password: hashedPassword,
                    email: email,
                    updatedAt: new Date().toString()
                },
            })

            const createUserAddress = await db.address.create({
                data: {
                  userId: newUser.id,
                  phoneNumber: phoneNumber,
                  city: city,
                  sub_city: sub_city 
                }
              });

            return user
        }
        catch (err: any) {
            console.log(err);
            if (err instanceof this.exception) {
                throw err;
            } else {
                throw new this.exception("db0001");
            }
        }

    }

    async update(id: any, input: any) {

        if (input.password) {
            input.password = await this.dependencies.get("encryption").hash(input.password);
        }

        try {

            return await db.user.update({
                where: {
                    id
                },
                data: input,
            });

        } catch (err: any) {
            throw new JoException("db0001");
        }
    }

    async changePassword(id: any, newPassword: string, oldPassword: string) {
        try{
            let user = await this.getUser(id);
            if (!user) {
                throw new JoException("auth0001");
            }
            if(!(await this.dependencies.get("encryption").compare(user.password, oldPassword))){
                throw new JoException("auth0002");
            }
    
            user.password = await this.dependencies.get("encryption").hash(newPassword)
    
            return await this.update(id, user);
        }
        catch(err: any){
            if (err instanceof this.exception) {
                throw err;
            } else {
                throw new this.exception("db0001");
            }
        }

    }

    async delete(id: number) {

        try {
            const deletedUser = await db.user.delete({
                where: { id },
            });

            return deletedUser;
        }
        catch (err: any) {
            if (err instanceof this.exception) {
                throw err;
            } else {
                throw new this.exception("db0001");
            }
        }

    }



}