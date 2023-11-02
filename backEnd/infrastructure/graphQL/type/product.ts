import orm from "../../persistance/orm"

import { GraphQLJSON } from 'graphql-type-json'; // Import the JSON type

import CategoryType from "./category"
import ProductVariationType from "./productVariation"



import  graphql, {
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
    name: "Product",
    fields: ()=> ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        desc: { type: GraphQLString },
        img: { type: GraphQLString },
        brand: { type: GraphQLString },
        color: { type: GraphQLJSON },
        size: { type: GraphQLString },
        price: { type: GraphQLInt },
        isActive: { type: GraphQLBoolean },
        quantity: { type: GraphQLInt },
        categoryId: { type: GraphQLInt },
        variation: {
            type:  new GraphQLList(ProductVariationType),
            resolve: async (parent, context, args)=>{
                const userProducts = await orm.productvariation.findMany({
                    where: {
                        productId: parent.id,
                    },
                  })
                  console.log(parent);
                return userProducts;
            }
        },
        category: {
            type:  CategoryType,
            resolve: async (parent, args)=>{
                return await orm.category.findUnique({
                    where: {
                        id: parent.categoryId,
                    },
                  })
            }
        }

      
    })
})  