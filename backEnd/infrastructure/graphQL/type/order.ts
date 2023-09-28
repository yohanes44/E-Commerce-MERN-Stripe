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
        id: { type: GraphQLID },
        state: { type: GraphQLString },
        userId: { type: GraphQLID },
        city: { type: GraphQLString },
        sub_city: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
})
