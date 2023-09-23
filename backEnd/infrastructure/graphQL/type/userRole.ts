
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
    name: "User_role",
    fields: ()=> ({
        userId: { type: GraphQLID },
        roleId: { type: GraphQLID }
    })
})