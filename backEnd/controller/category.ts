

import CategoryInterfce from "../application/interface/Category";
import RoleInterfce from "../application/interface/Role";

import {PrismaClient} from "@prisma/client"

const db = new PrismaClient();



export default class CategoryController{

    private dependencies;

    constructor(deps: any){
        this.dependencies = deps;
    }

    async getCategory (id: number){
        return await db.category.findUnique({
            where: {
                id
            },
        })
    }
    async getCategories (id: number){
        return await db.category.findMany()
    }

    async create ({name}: CategoryInterfce){
        return await db.category.create({
            data: {
                name: name
            },
        })    
    }

    async update (id: number, input: any){
        return await db.category.update({
            where: { 
                id
            },
            data: input,
          });  
    }

    async delete(id : number){
        
        try{
            return await db.category.delete({
                where: { id },
              });
        }
        catch(err: any){
            console.log(err);
        }

    }





}