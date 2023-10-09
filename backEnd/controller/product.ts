

import ProductInterfce from "../application/interface/Product";
import UserClass from "../application/entities/user";

import { PrismaClient } from "@prisma/client"

const db = new PrismaClient();

// const { GraphQLUpload } = require('graphql-upload');



export default class ProductController {

    private dependencies;
    private exception;

    constructor(deps: any, exception: any) {
        this.dependencies = deps;
        this.exception = exception;
    }


    async getProduct(id: number) {
        try {
            return await db.product.findUnique({
                where: {
                    id: id
                }
            })
        }
        catch (err: any) {
            console.log(err);
        }
    }

    async getProducts(category: string) {
        try {
            const products = await db.product.findMany({
                include: {
                    category: true,
                },
                where: category ? { category: { name: category } } : {},
            });

            return products;
        }
        catch (err: any) {
            console.log(err);
        }
    }

    async create(data: ProductInterfce) {
        try {
            // const { createReadStream, filename } = await data.img;
            return await db.product.create({
                data
            })
        }
        catch (err: any) {
            console.log(err);
        }
    }

    async update(id: any, input: any) {

        
        if(input.color){
            // input.color = JSON.parse(input.color)

        }
        
        try {
            return await db.product.update({
                where: {
                    id
                },
                data: input,
            });
        }
        catch (err: any) {
            console.log(err);
        }

    }

    async delete(id: number) {

        try {
            return await db.product.delete({
                where: { id },
            });
        }
        catch (err: any) {
            console.log(err);
        }

    }



}