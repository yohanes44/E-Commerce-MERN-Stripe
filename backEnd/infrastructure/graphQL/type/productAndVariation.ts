

import orm from "../../persistance/orm"

import { GraphQLJSON } from 'graphql-type-json'; // Import the JSON type

import CategoryType from "./category"
import ProductVariationType from "./productVariation"
import ProductType from "./product"


import graphql, {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull,
} from "graphql";


export default new GraphQLObjectType({
    name: "ProductAndVariation",
    fields: () => ({
        id: { type: GraphQLID },
        products: {
            type: new GraphQLList(ProductType),
            resolve: async (parent: any, args: any, context: any) => {
                return context.controller.ProductController.getProductAndVariation(parent.category);
            }
        },
        variations: {
            type: new GraphQLList(ProductVariationType),
            resolve: async (parent: any, args: any, context: any) => {
                
                return orm.productvariation.findMany({
                    where: {
                        productId: parent.id
                    }
                })
            }
        }

    })
})  