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
    name: "Address",
    fields: ()=> ({
        id: { type: GraphQLID },
        userId: {type: GraphQLID},
        phoneNumber: { type: GraphQLString },
        city: { type: GraphQLString },
        sub_city: { type: GraphQLString },
    })
})
