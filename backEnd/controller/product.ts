

import ProductInterfce from "../application/interface/Product";
import UserClass from "../application/entities/user";

import {PrismaClient} from "@prisma/client"

const db = new PrismaClient();

// const { GraphQLUpload } = require('graphql-upload');



export default class ProductController{

    private dependencies;
    private exception;

    constructor(deps: any, exception: any){
        this.dependencies = deps;
        this.exception = exception;
    }


    async getProduct(id: number){
        try{
            return await db.product.findUnique({
                where: {
                    id: id
                }
            })}
        catch(err: any){
            console.log(err);
        }
    }

    async getProducts () {
        try{
            return await db.product.findMany()
        }
        catch(err: any){
            console.log(err);
        }
    }

    async create(data : ProductInterfce){
        try{
            // const { createReadStream, filename } = await data.img;
            return await db.product.create({
                data
            })
        }
        catch(err: any){
            console.log(err);
        }
    }

    async update(id: any, input : any){
        
        try{
            return await db.product.update({
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
            return await db.product.delete({
                where: { id },
              });
        }
        catch(err: any){
            console.log(err);
        }

    }



}