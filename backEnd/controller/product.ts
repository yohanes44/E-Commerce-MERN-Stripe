

import ProductInterfce from "../application/interface/Product";
import ProductVariationInterfce from "../application/interface/ProductVariation";
import UserClass from "../application/entities/user";

import { PrismaClient, category } from "@prisma/client"

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

    // category ? { category: { name: category } : {}
    async getProducts({category = "", selectedFilter ={}} : {category : string, selectedFilter: any} ) {
        try {
            
            // console.log(selectedFilter);

            const where = { 
                category: {},
                productvariation: {},
                deleted: 0 
            };

            const include = {
                category: true,
                productvariation: true,
            };

            if(category){
                where.category = {
                    name: category
                };
            }

            if(selectedFilter.color != "all" && selectedFilter.size != "all"){
                where.productvariation = {
                    some: {
                        color: selectedFilter.color,
                        size: selectedFilter.size
                    }
                }
            }

            if(selectedFilter.size != "all" && selectedFilter.color == "all"){
                where.productvariation = {
                    some: {
                        size: selectedFilter.size
                    }
                }
            }
            if(selectedFilter.color != "all" && selectedFilter.size == "all"){
                where.productvariation = {
                    some: {
                        color: selectedFilter.color
                    }
                }
            }

            const orderBy : any= {}

            if (selectedFilter.sort === "newest") {
                orderBy.id = "desc";
            } else if (selectedFilter.sort === "price_desc") {
                orderBy.price = "desc";
            } else if (selectedFilter.sort === "price_asc") {
                orderBy.price = "asc";
            } else if (selectedFilter.sort === "alphabetical_desc") {
                orderBy.name = "desc";
            } else if (selectedFilter.sort === "alphabetical_asc") {
                orderBy.name = "asc";
            }

            const products = await db.product.findMany({
                where,
                include,
                orderBy
            });

            // console.log({products});

            
            return products;
        }  
        catch (err: any) {
            console.log(err);
        }
    }

    async getProductVariation(productId: number) {
        try {

            let products = null;

            if (productId) {
                products = await db.productvariation.findMany({
                    where: { productId: productId }
                })
            } else {
                products = await db.productvariation.findMany();
            }

            return products;
        }
        catch (err: any) {
            console.log(err);
        }
    }

    async getProductAndVariation(category: string) {
        try {
       
            const cat = await db.category.findFirst({
                where: {
                        name: category,
                },
            });
            const products = await db.product.findMany({
                where: {
                    categoryId: cat?.id,
                    deleted: 0 
                },
                include:{
                    productvariation: {
                        select: {
                            color: true,
                            size: true,
                        },
                    },
                }
            });
            return products

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

    async createProductVariation(data: ProductVariationInterfce) {
        try {
            // const { createReadStream, filename } = await data.img;
            return await db.productvariation.create({
                data
            })
        }
        catch (err: any) {
            console.log(err);
        }
    }

    async deleteProductVariation(id: number){
        try {

            return await db.productvariation.delete({
                 where: { 
                     id
                  },
               });
         }
         catch (err: any) {
             console.log(err);
         }
    }
    async update(id: any, input: any) {


        if (input.color) {
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

           return await db.product.update({
                where: { 
                    id
                 },
                data: { 
                    deleted: 1 
                },
              });
        }
        catch (err: any) {
            console.log(err);
        }

    }



}