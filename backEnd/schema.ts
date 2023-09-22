
import orm from "./infrastructure/persistance/orm"


import  graphql, {
    GraphQLObjectType, 
    GraphQLSchema, 
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList
} from "graphql";








const UserType = new GraphQLObjectType({
    name: "User",
    fields: ()=> ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
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

const ProductType = new GraphQLObjectType({
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

const RoleType = new GraphQLObjectType({
    name: "Role",
    fields: ()=> ({
        id: { type: GraphQLID },
        name: { type: GraphQLString }
    })
})

const UserRoleType = new GraphQLObjectType({
    name: "User_role",
    fields: ()=> ({
        userId: { type: GraphQLID },
        roleId: { type: GraphQLID }
    })
})

const CartType = new GraphQLObjectType({
    name: "Cart",
    fields: ()=> ({
        id: { type: GraphQLID },
        productId: { type: GraphQLID },
        userId: { type: GraphQLID },
        orderId: { type: GraphQLID },
        state: { type: GraphQLString },
        quantity: { type: GraphQLInt }
    })
})


const OrderType = new GraphQLObjectType({
    name: "Order",
    fields: ()=> ({
        id: { type: GraphQLID },
        state: { type: GraphQLString },
        userId: { type: GraphQLID },
        city: { type: GraphQLString },
        sub_city: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
})



const CategoryType = new GraphQLObjectType({
    name: "Category",
    fields: ()=> ({
        id: { type: GraphQLID },
        name: { type: GraphQLString }
    })
})


const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: UserType,
            args: {
               firstName: {type: GraphQLString},
               lastName: {type: GraphQLString},
               email: {type: GraphQLString},
               password: {type: GraphQLString}
            },
            async resolve(parent, args){
                const user = await orm.user.create({
                    data: {
                      firstName: args.firstName,
                      lastName: args.firstName,
                      email: args.email,    
                      password: args.password
                    },
                  })
                
                return user
            }       
        },
        addRole: {
            type: RoleType,
            args: {
               name: {type: GraphQLString}
            },
            async resolve(parent, args){
                const role = await orm.role.create({
                    data: {
                      name: args.name
                    },
                  })
                
                return role;
            }        
        },
        addProduct: {
            type: ProductType,
            args: {
               name: {type: GraphQLString},
               desc: {type: GraphQLString},
               img: {type: GraphQLString},
               brand: {type: GraphQLString},
               color: {type: GraphQLString},
               size: {type: GraphQLString},
               price: {type: GraphQLInt},
               isActive: {type: GraphQLBoolean},
               quantity: {type: GraphQLInt},
               category: {type: GraphQLString},
            },
            async resolve(parent, args){
                const product = await orm.product.create({
                    data: {
                      name: args.name,
                      desc: args.desc,
                      img: args.img,
                      brand: args.brand,
                      color: args.color,
                      size: args.size,
                      price: args.price,
                      isActive: args.isActive,
                      quantity: args.quantity,
                      category: args.category,
                    },
                  })
                
                return product;
            }         
        },
        addOrder: {
            type: OrderType,
            args: {
               state: {type: GraphQLString},
               userId: {type: GraphQLID},
               city: {type: GraphQLString},
               sub_city: {type: GraphQLString},
               phone: {type: GraphQLString},
               total: {type: GraphQLInt},
            }       
        },
        addCategory: {
            type: CategoryType,
            args: {
               name: {type: GraphQLString},
            }       
        },
        addCart: {
            type: CartType,
            args: {
               productId: {type: GraphQLID},
               userId: {type: GraphQLID},
               orderId: {type: GraphQLID},
               state: {type: GraphQLString},
               quantity: {type: GraphQLInt},
            }       
        },
        addUserRole: {
            type: UserRoleType,
            args: {
               userId: {type: GraphQLInt},
               roleId: {type: GraphQLInt},
            },
            async resolve(parent, args){
                const userRole = await orm.user_role.create({
                    data: {
                      userId: args.userId,
                      roleId: args.roleId,
                    },
                  })
                
                return userRole;
            }         
        },

    }
})




const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: { id: {type: GraphQLInt} },
            async resolve(parent, args){

                const user = await orm.user.findUnique({
                    where: {
                      id: args.id
                    }
                  })
                
                return user;
            }
        },
        user_role: {
            type: new GraphQLList(UserRoleType),
            args: { id: {type: GraphQLInt} },
            async resolve(parent, args){
                const userRole = await orm.user_role.findMany({
                    where: {
                      userId: args.id
                    },
                  })
                
                return userRole;
            }
        },
        product: {
            type: ProductType,
            args: { id: {type: GraphQLInt} },
            async resolve(parent, args){
                const product = await orm.product.findUnique({
                    where: {
                      id: args.id
                    },
                  })
                
                return product;
            }
        },

        allProducts: {
            type: new GraphQLList(ProductType),
            async resolve(parent, args){
                return await orm.product.findMany()
            }
        }
    }
})


// example mutation
    // mutation example
        // User
        // mutation{
        // 	addUser(firstName:  "yonas", lastName: "Debe", email: "yonas@g.com", password: "yonas123"){
        //   	password
        // 	}
        // }

        //Peoduct 
        // mutation{
        //     addProduct(name: "winning11", desc:"test desc", img: "test img", brand: "sony", color: "red", size: "24", price: 120, isActive: false, quantity: 4, category: "game"){
        //           name
        //   }
        // }


// example query
    // withOut argument product
    // {
    //     allProducts{
    //           name
    //   }
    // }

     // with argument product
    //  {
    //     product(id: 1){
    //           name
    //   }
    // }

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})