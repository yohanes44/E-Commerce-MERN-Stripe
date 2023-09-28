


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
    name: 'OrderInput',
    fields: {
        state: { type: GraphQLString },
        userId: { type: GraphQLInt },
        city: { type: GraphQLString },
        sub_city: { type: GraphQLString },
        phone: { type: GraphQLString },
        total: { type: GraphQLInt },
    },
  });