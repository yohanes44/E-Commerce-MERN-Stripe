
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



import CartType from "./type/cart"
import UserType from "./type/user"
import ProductType from "./type/product"
import RoleType from "./type/role"
import UserRoleType from "./type/userRole"
import OrderType from "./type/order"
import CategoryType from "./type/category"
import UserInputType from "./type/userInput"
import OrderInputType from "./type/orderInput"
import RoleInputType from "./type/roleInput"
import CategoryInputType from "./type/categoryInput"
import ProductInputType from "./type/productInput"



import UserResolver from "./resolver/user"
import RoleResolver from "./resolver/role"
import OrderResolver from "./resolver/order"
import ProductResolver from "./resolver/product"
import CartResolver from "./resolver/cart"
import CategoryResolver from "./resolver/category"
import LoginResolver from "./resolver/auth"




export default class Resolvers{

    
    getSchema(){
    
        const RootQuery  = new GraphQLObjectType({
            name: "RootQueryType",
            fields: {
                user: {
                    type: UserType,
                    args: { id: {type: GraphQLInt} },
                    resolve: UserResolver.getUser
                },
                users: {
                    type: new GraphQLList(UserType),
                    resolve: UserResolver.getUsers
                },
                role: {
                    type: RoleType,
                    args: { id: {type: GraphQLInt} },
                    resolve: RoleResolver.getRole
                },
                roles: {
                    type: new GraphQLList(RoleType),
                    resolve: RoleResolver.getRoles
                },
                userRole: {
                    type: new GraphQLList(UserRoleType),
                    args: { userId: {type: GraphQLInt} },
                    resolve: RoleResolver.getUserRole
                },
                product: {
                    type: ProductType,
                    args: { id: {type: GraphQLInt} },
                    resolve: ProductResolver.getProduct
                },
                products: {
                    type: new GraphQLList(ProductType),
                    args: {
                        category: { type: GraphQLString }, // Make categoryId optional
                    },
                    resolve: ProductResolver.getProducts
                },
                order: {
                    type: OrderType,
                    args: { id: {type: GraphQLInt} },
                    resolve: OrderResolver.getOrder
                },
                orders: {
                    type:  new GraphQLList(OrderType),
                    args: { id: {type: GraphQLInt} },
                    resolve: OrderResolver.getOrders
                },
                ordersByState: {
                    type:  new GraphQLList(OrderType),
                    args: { id: {type: GraphQLInt} },
                    resolve: OrderResolver.getOrdersByState
                },
                getOrders: {
                    type:  new GraphQLList(OrderType),
                    args: { id: {type: GraphQLInt} },
                    resolve: OrderResolver.getOrders
                },
                userOrder: {
                    type: OrderType,
                    args: { userId: {type: GraphQLInt} },
                    resolve: OrderResolver.getUserOrders
                },
                userOrdersByState: {
                    type:  new GraphQLList(OrderType),
                    args: { 
                        userId: {type: GraphQLInt},
                        state: {type: GraphQLString},
                    },
                    resolve: OrderResolver.getUserOrdersByState
                },
                category: {
                    type: CategoryType,
                    args: { id: {type: GraphQLInt} },
                    resolve: CategoryResolver.getCategory
                },
                categories: {
                    type: new GraphQLList(CategoryType),
                    resolve: CategoryResolver.getCategories
                },
                cartItem: {
                    type:  CartType,
                    args: { id: {type: GraphQLInt} },
                    resolve: CartResolver.getCartItem
                },
                cartItems: {
                    type:  new GraphQLList(CartType),
                    args: { userId: {type: GraphQLInt} },
                    resolve: CartResolver.getCartItems
                }
            }
         })

        const Mutation = new GraphQLObjectType({
            name: "Mutation",
            fields: {
                addUser: {
                    type: UserType,
                    args: {
                    firstName: {type: new GraphQLNonNull(GraphQLString)},
                    lastName: {type: new GraphQLNonNull(GraphQLString)},
                    email: {type: new GraphQLNonNull(GraphQLString)},
                    password: {type: new GraphQLNonNull(GraphQLString)}
                    },
                    resolve: UserResolver.addUser       
                },
                updateUser: {
                    type: UserType,
                    args: {
                        id: { type: new GraphQLNonNull(GraphQLInt) },
                        input: { type: UserInputType},
                        lang: { type: GraphQLString }
                    },
                   resolve: UserResolver.updateUser
         
                },
                changePassword: {
                    type: UserType,
                    args: {
                        id: { type: new GraphQLNonNull(GraphQLInt) },
                        newpassword: { type: GraphQLString },
                        oldpassword: { type: GraphQLString },
                        lang: { type: GraphQLString }
                    },
                   resolve: UserResolver.changeUserPassword
         
                },
                deleteUser: {
                    type:  UserType,
                    args: {
                        id: { type: new GraphQLNonNull(GraphQLInt) },
                    },
                    resolve: UserResolver.deleteUser     
                },
                addRole: {
                    type: RoleType,
                    args: {
                        name: {type: GraphQLString}
                    },
                    resolve: RoleResolver.addRole      
                },
                updateRole: {
                    type: RoleType,
                    args: {
                        id: { type: new GraphQLNonNull(GraphQLInt) },
                        input: { type: RoleInputType}
                    },
                   resolve: RoleResolver.updateRole    
                },
                deleteRole: {
                    type:  RoleType,
                    args: {
                        id: { type: new GraphQLNonNull(GraphQLInt) },
                    },
                    resolve: RoleResolver.deleteRole     
                },
                addUserRole: {
                    type: UserRoleType,
                    args: {
                        userId: {type: GraphQLInt},
                        roleId: {type: GraphQLInt}
                    },
                    resolve: RoleResolver.addUserRole      
                },
                deleteUserRole: {
                    type: UserRoleType,
                    args: {
                        userId: {type: GraphQLInt},
                        roleId: {type: GraphQLInt}
                    },
                    resolve: RoleResolver.deleteUserRole      
                },
                addProduct: {
                    type: ProductType,
                    args: {
                        name: {type: GraphQLString},
                        desc: {type: GraphQLString},
                        img: {type: GraphQLString },
                        brand: {type: GraphQLString},
                        color: {type: GraphQLString},
                        size: {type: GraphQLString},
                        price: {type: GraphQLInt},
                        isActive: {type: GraphQLBoolean},
                        quantity: {type: GraphQLInt},
                        categoryId: {type: GraphQLInt},
                    },
                    resolve: ProductResolver.create     
                },
                updateProduct: {
                    type: ProductType,
                    args: {
                        id: { type: new GraphQLNonNull(GraphQLInt) },
                        input: { type: ProductInputType}
                    },
                    resolve: ProductResolver.update     
                },
                deleteProduct: {
                    type:  ProductType,
                    args: {
                        id: { type: new GraphQLNonNull(GraphQLInt) },
                    },
                    resolve: ProductResolver.delete     
                },
                addCartItem: {
                    type: CartType,
                    args: {
                        productId: {type: GraphQLInt},
                        userId: {type: GraphQLInt},
                        // state: {type: GraphQLString},
                        quantity: {type: GraphQLInt},
                    },
                    resolve: CartResolver.addCartItem       
                },
                updateCartItemQuantity: {
                    type: CartType,
                    args: {
                        id: {type: GraphQLInt},
                        quantity: {type: GraphQLInt},
                    },
                    resolve: CartResolver.updateCartItemQuantity       
                },
               deleteCartItem: {
                    type: CartType,
                    args: {
                        id: { type: new GraphQLNonNull(GraphQLInt) }
                    },
                    resolve: CartResolver.deleteCartItem     
                },
                clearCart: {
                    type:  CartType,
                    args: {
                        userId: { type: new GraphQLNonNull(GraphQLInt) },
                    },
                    resolve: CartResolver.clearCart     
                },
                login: {
                    type: new GraphQLObjectType({
                        name: "Login",
                        fields: ()=> ({
                            token: { type: GraphQLString }
                        })
                    }),
                    args: {
                        email: {type: GraphQLString},
                        password: {type: GraphQLString}
                    },
                    resolve: LoginResolver.login
                },
                addOrder: {
                    type: OrderType,
                    args: {
                        // state: {type: GraphQLString},
                        userId: {type: GraphQLInt},
                        // city: {type: GraphQLString},
                        // sub_city: {type: GraphQLString},
                        // phone: {type: GraphQLString},
                        // total: {type: GraphQLInt},
                    },  
                    resolve: OrderResolver.create     
                },
                updateOrder: {
                    type: ProductType,
                    args: {
                        id: { type: new GraphQLNonNull(GraphQLInt) },
                        input: { type: OrderInputType}
                    },
                    resolve: OrderResolver.update     
                },
                deleteOrder: {
                    type:  OrderType,
                    args: {
                        id: { type: new GraphQLNonNull(GraphQLInt) },
                    },
                    resolve: OrderResolver.delete     
                },
                addCategory: {
                    type: CategoryType,
                    args: {
                        name: {type: GraphQLString},
                    },
                    resolve: CategoryResolver.create        
                },
                updateCategory: {
                    type: CategoryType,
                    args: {
                        id: { type: new GraphQLNonNull(GraphQLInt) },
                        input: { type: CategoryInputType}
                    },
                    resolve: CategoryResolver.update     
                },
                deleteCategory: {
                    type:  CategoryType,
                    args: {
                        id: { type: new GraphQLNonNull(GraphQLInt) },
                    },
                    resolve: CategoryResolver.delete     
                }
        
            }
        })

        return new GraphQLSchema({
            query: RootQuery,
            mutation: Mutation
        })
        
    }


}
