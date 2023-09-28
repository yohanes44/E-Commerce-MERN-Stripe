


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
    name: 'ProductInput',
    fields: {
        name: { type: GraphQLString },
        desc: { type: GraphQLString },
        img: { type: GraphQLString },
        brand: { type: GraphQLString },
        color: { type: GraphQLString },
        size: { type: GraphQLString },
        price: { type: GraphQLInt },
        isActive: { type: GraphQLBoolean },
        quantity: { type: GraphQLInt },
        categoryId: { type: GraphQLInt }
    },
  });


