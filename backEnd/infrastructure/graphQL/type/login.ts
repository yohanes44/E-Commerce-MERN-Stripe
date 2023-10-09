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

import UserType from "./user"


export default new GraphQLObjectType({
    name: "login",
    fields: ()=> ({
        token: { type: GraphQLString },
        user: {
            type:  UserType,
            resolve: async (parent, args)=>{
             
                const user = await orm.user.findFirst({
                    where: {
                        email: args.email
                    },
                  })
                
                return user;

            }
        }
    })
})


