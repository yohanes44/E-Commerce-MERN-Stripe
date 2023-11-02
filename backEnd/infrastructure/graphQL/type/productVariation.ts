import orm from "../../persistance/orm"

import { GraphQLJSON } from 'graphql-type-json'; // Import the JSON type

import CategoryType from "./category"



import  graphql, {
    GraphQLObjectType, 
    GraphQLSchema, 
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull,
} from "graphql";


export default new GraphQLObjectType({
    name: "ProductVariation",
    fields: ()=> ({
        id: { type: GraphQLID },
        img: { type: GraphQLString },
        color: { type: GraphQLString },
        size: { type: GraphQLString },
        quantity: { type: GraphQLInt },
        productId: { type: GraphQLInt }
    })
})  