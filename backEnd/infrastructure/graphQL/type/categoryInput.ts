


import orm from "../../persistance/orm"
import jwt from "jsonwebtoken"

import  graphql, {
    GraphQLObjectType, 
    GraphQLSchema, 
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType
} from "graphql";


export default new GraphQLInputObjectType({
    name: 'CategoryInput',
    fields: {
        name: { type: GraphQLString }
    },
  });