
import  graphql, {
    GraphQLObjectType, 
    GraphQLSchema, 
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} from "graphql";


const users = [
    {
        id: 1,
        name: "john",
        email: "john@gmail.com",
        username: "dd",
        password: "john4466"
    },
    {
        id: 2,
        name: "samuel",
        email: "sanuel@gmail.com",
        username: "dd",
        password: "samuel4466"
    },
    {
        id: 3,
        name: "abeni",
        email: "abeni@gmail.com",
        username: "dd",
        password: "abeni4466"
    }
]


const roles = [
    {
        id: 1,
        name: "admin"
    },
    {
        id: 2,
        name: "user"
    },
    {
        id: 3,
        name: "operator"
    }
]

const user_roles = [
    {
        userId: 1,
        roleId: 2
    },
    {
        userId: 2,
        roleId: 3
    },
    {
        userId: 3,
        roleId: 1
    },
    {
        userId: 2,
        roleId: 3
    },
    {
        userId: 3,
        roleId: 1
    }
]





const Usertype = new GraphQLObjectType({
    name: "User",
    fields: ()=> ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        roles: {
            type:  new GraphQLList(Roletype),
            resolve: (parent, args)=>{
                const roles2: any = [];
                user_roles.map((uRole) => {
                    if(uRole.userId == parent.id){
                        const role = roles.find((role) => role.id == uRole.roleId);
                        roles2.push(role); 
                    } 
                });
                return roles2;
            }
        }
    })
})

const Producttype = new GraphQLObjectType({
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
        active: { type: GraphQLString },
        quantity: { type: GraphQLInt },
        category: { type: GraphQLString }
    })
})  

const Roletype = new GraphQLObjectType({
    name: "Role",
    fields: ()=> ({
        id: { type: GraphQLID },
        name: { type: GraphQLString }
    })
})

const UserRoletype = new GraphQLObjectType({
    name: "User_role",
    fields: ()=> ({
        userId: { type: GraphQLID },
        roleId: { type: GraphQLID }
    })
})

const Carttype = new GraphQLObjectType({
    name: "Cart",
    fields: ()=> ({
        id: { type: GraphQLID },
        productI: { type: GraphQLID },
        userId: { type: GraphQLID },
        orderId: { type: GraphQLID },
        state: { type: GraphQLString },
        quantity: { type: GraphQLInt }
    })
})


const Ordertype = new GraphQLObjectType({
    name: "Cart",
    fields: ()=> ({
        id: { type: GraphQLID },
        state: { type: GraphQLString },
        userId: { type: GraphQLID },
        city: { type: GraphQLString },
        sub_city: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
})



const Category = new GraphQLObjectType({
    name: "Category",
    fields: ()=> ({
        id: { type: GraphQLID },
        name: { type: GraphQLString }
    })
})






const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: Usertype,
            args: { id: {type: GraphQLID} },
            resolve(parent, args){
                return users.find((user) => user.id == args.id);
            }
        },
        user_role: {
            type: UserRoletype,
            args: { id: {type: GraphQLID} },
            resolve(parent, args){
                return users.find((user) => user.id == args.id);
            }
        }
    }
})


export default new GraphQLSchema({
    query: RootQuery,
})