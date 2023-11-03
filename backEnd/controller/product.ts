

import ProductInterfce from "../application/interface/Product";
import ProductVariationInterfce from "../application/interface/ProductVariation";
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

    // category ? { category: { name: category } : {}
    async getProducts(category: string, selectedFilter: any) {
        try {
            
            console.log(selectedFilter);

            const where = { 
                category: {},
                productvariation: {} 
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

            if(selectedFilter.color != "all" ){
                where.productvariation = {
                    some: {
                        color: selectedFilter.color
                    }
                }
            }

            if(selectedFilter.size != "all" ){
                where.productvariation = {
                    some: {
                        color: selectedFilter.color
                    }
                }
            }

            const products = await db.product.findMany({
                where,
                include,
            });

            console.log({products});
            return products;
        }  
        catch (err: any) {
            console.log(err);
        }
    }



    // async getProducts(category: string, filterInput: any) {
    //     try {
    //         let unfiltered = await db.product.findMany({
    //             where: { 
    //                     category: { name: category },
    //                     productvariation: {
    //                         some: (filterInput.color && filterInput.size) ? {
    //                                             color: filterInput.color,
    //                                             size: filterInput.size
    //                                } : (filterInput.color && filterInput.size == null) ? {
    //                                         color: filterInput.color
    //                                     } : (filterInput.color == null && filterInput.size) ? {
    //                                         size: filterInput.size
    //                                     } 
    //                 }
    //             },
    //             include: {
    //                 category: true,
    //                 productvariation: true
    //             },
    //         });    
    
    //         // if(filterInput.color != "all"){
    //         //     let unfilteredColor = await db.product.findMany({
    //         //         include: {
    //         //             category: true,
    //         //         },
    //         //         where: category ? { category: { name: category } } : {},
    //         //     });    
    //         // }
    //         // if(filterInput.size != "all"){

    //         // }
            

    //         return unfiltered;
    //     }
    //     catch (err: any) {
    //         console.log(err);
    //     }
    // }

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
            return await db.product.delete({
                where: { id },
            });
        }
        catch (err: any) {
            console.log(err);
        }

    }



}