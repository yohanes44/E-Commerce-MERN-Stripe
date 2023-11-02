// import orm from "../../persistance/orm"

// import RoleType from "./role"


// import  graphql, {
//     GraphQLObjectType, 
//     GraphQLSchema, 
//     GraphQLString,
//     GraphQLID,
//     GraphQLInt,
//     GraphQLBoolean,
//     GraphQLList,
//     GraphQLNonNull
// } from "graphql";



// export default  new GraphQLObjectType({
//     name: "User",
//     fields: ()=> ({
//         id: { type: GraphQLID },
//         firstName: { type: GraphQLString },
//         lastName: { type: GraphQLString },
//         email: { type: GraphQLString },
//         phoneNumber: { type: GraphQLInt }, 
//         password: { type: GraphQLString },
//         roles: {
//             type:  new GraphQLList(RoleType),
//             resolve: async (parent, args)=>{
             
//                 const userRoles = await orm.user_role.findMany({
//                     where: {
//                         userId: parent.id,
//                     },
//                   })

//                 const roleIds = userRoles.map((userRole) => userRole.roleId);

//                 const roles = await orm.role.findMany({
//                     where: {
//                       id: {
//                         in: roleIds,
//                       },
//                     },
//                   });
                
//                 return roles;

//             }
//         }
//     })
// })


import orm from "../../persistance/orm"

import RoleType from "./role"


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
    name: "User",
    fields: ()=> ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        phoneNumber: { type: GraphQLInt }, 
        password: { type: GraphQLString },
        roles: {
            type:  new GraphQLList(RoleType),
            resolve: async (parent, args)=>{
             
                const userRoles = await orm.user_role.findMany({
                    where: {
                        userId: parent.id,
                    },
                  })

                const roleIds = userRoles.map((userRole) => userRole.roleId);

                const roles = await orm.role.findMany({
                    where: {
                      id: {
                        in: roleIds,
                      },
                    },
                  });
                
                return roles;

            }
        }
    })
})