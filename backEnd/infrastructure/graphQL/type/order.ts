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


export default new GraphQLObjectType({
    name: "Order",
    fields: ()=> ({
        id:{ type: GraphQLID },
        userId: { type: GraphQLID },
        state: { type: GraphQLString },
        total: { type: GraphQLInt },
        date: { type: GraphQLString }
    })
})
