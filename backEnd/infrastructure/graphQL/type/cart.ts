import orm from "../../persistance/orm"



import  graphql, {
    GraphQLObjectType, 
    GraphQLSchema, 
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull
} from "graphql";

import ProductType from "./product"
import ProductVariationType from "./product"
import UserType from "./user"
import CategoryType from "./category"




export default  new GraphQLObjectType({
    name: "Cart",
    fields: ()=> ({
        id: { type: GraphQLID },
        productId: { type: GraphQLID },
        variationId: { type: GraphQLID },
        userId: { type: GraphQLID },
        orderId: { type: GraphQLID },
        state: { type: GraphQLString },
        quantity: { type: GraphQLInt },
        user: {
            type:  UserType,
            resolve: async (parent, args)=>{
             
                const userProducts = await orm.user.findUnique({
                    where: {
                        id: parent.userId,
                    },
                  })
                  
                return userProducts;
            }
        },
        // category: {
        //     type:  CategoryType,
        //     resolve: async (parent, args)=>{
             
        //         const userProducts = await orm.category.findUnique({
        //             where: {
        //                 id: parent.userId,
        //             },
        //           })
                  
        //         return userProducts;
        //     }
        // },
        product: {
            type:  ProductType,
            resolve: async (parent, args)=>{
             
                const userProducts = await orm.product.findUnique({
                    where: {
                        id: parent.productId,
                    },
                  })
                
                return userProducts;
            }
        },
        productvariation: {
            type:  ProductVariationType,
            resolve: async (parent, args)=>{
             
                const userProducts = await orm.productvariation.findUnique({
                    where: {
                        id: parent.variationId,
                    },
                  })
                
                return userProducts;
            }
        }
    })
})