

import UserRoleInterfce from "../application/interface/UserRole";
import RoleInterfce from "../application/interface/Role";

import {PrismaClient} from "@prisma/client"

const db = new PrismaClient();



export default class RoleController{


    private dependencies;

    constructor(deps: any){
        this.dependencies = deps;
    }

    async getRole(id: any){
        try{
            return await db.role.findUnique({
                where: {
                    id: id
                }
            })}
        catch(err: any){
            console.log(err);
        }
    }

    async getRoles () {
        try{
            return await db.role.findMany()
        }
        catch(err: any){
            console.log(err);
        }
    }


    async addRole ({name}: RoleInterfce){
        return await db.role.create({
            data: {
                name: name
            }
        })    
    }

    async updateRole (id: number, input: any){
        return await db.role.update({
            where: { 
                id
            },
            data: input,
          });  
    }

    async deleteRole (id: number){
        return await db.role.delete({
            where: { id },
          });
    }

    async getUserRole (userId: number){
        return await db.user_role.findMany({
            where: {
                userId: userId
            },
        })
    }

    async addUserRole ({ userId, roleId } : UserRoleInterfce){
        return await db.user_role.create({
            data: {
                userId: userId,
                roleId: roleId,
            },
        })        
    }

    async deleteUserRole ({ userId, roleId }: UserRoleInterfce){
        return await db.user_role.deleteMany({
            where: {
                userId: userId,
                roleId: roleId,
            },
        })
    }


}