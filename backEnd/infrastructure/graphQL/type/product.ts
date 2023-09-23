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
    name: "Product",
    fields: ()=> ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        desc: { type: GraphQLString },
        img: { type: GraphQLString },
        brand: { type: GraphQLString },
        color: { type: GraphQLString },
        size: { type: GraphQLString },
        price: { type: GraphQLInt },
        isActive: { type: GraphQLBoolean },
        quantity: { type: GraphQLInt },
        category: { type: GraphQLString }
    })
})  