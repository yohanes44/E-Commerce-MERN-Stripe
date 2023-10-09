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


export default  new GraphQLObjectType({
    name: "Cart",
    fields: ()=> ({
        id: { type: GraphQLID },
        productId: { type: GraphQLID },
        userId: { type: GraphQLID },
        orderId: { type: GraphQLID },
        state: { type: GraphQLString },
        quantity: { type: GraphQLInt },
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
        }
    })
})