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



export default  new GraphQLObjectType({
    name: "Cart",
    fields: ()=> ({
        id: { type: GraphQLID },
        productId: { type: GraphQLID },
        userId: { type: GraphQLID },
        orderId: { type: GraphQLID },
        state: { type: GraphQLString },
        quantity: { type: GraphQLInt }
    })
})