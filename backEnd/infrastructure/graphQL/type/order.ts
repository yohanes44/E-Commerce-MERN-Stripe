import orm from "../../persistance/orm"

import UserType from "./user"
import ProductType from "./product"
import CartType from "./cart"


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


export default  new GraphQLObjectType({
    name: "Order",
    fields: ()=> ({
        id:{ type: GraphQLID },
        userId: { type: GraphQLID },
        state: { type: GraphQLString },
        total: { type: GraphQLInt },
        date: { type: GraphQLString },
        user: {
            type:  UserType,
            resolve: async (parent, context, args)=>{
                const userProducts = await orm.user.findFirst({
                    where: {
                        id: parent.userId,
                    },
                  })
                //   console.log(parent);
                return userProducts;
            }
        },
        cart: {
            // type:  new GraphQLList(CartType),
            // resolve: async (parent, context, args)=>{
            //     const userProducts = await orm.user.findFirst({
            //         where: {
            //             id: parent.userId,
            //         },
            //       })
            //     //   console.log(parent);
            //     return userProducts;
            // }
        },
    })
})
