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
    name: "Category",
    fields: ()=> ({
        id: { type: GraphQLID },
        name: { type: GraphQLString }
    })
})