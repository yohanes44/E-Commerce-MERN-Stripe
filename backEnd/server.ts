import express, {Request, Response} from "express";


// const { port, database, validation, appSecretKey, appAddress, encryption, tokenGenerator } = new Configuration().getConfiguration();

import {graphqlHTTP}  from "express-graphql";

import graphQLSchema from "./infrastructure/graphQL/schema"

import AuthMiddleware from "./infrastructure/middleware/auth";


import EncryptionService from "./infrastructure/service/authentication/encryption"
import TokenGeneratorService from "./infrastructure/service/authentication/tokenGenerator"
import ValidationService from "./infrastructure/service/validation/validation"

import AuthControllerClass from "./controller/auth"
import UserControllerClass from "./controller/user"
import RoleControllerClass from "./controller/role"
import CartControllerClass from "./controller/cart"
import ProductControllerClass from "./controller/product"
import CategoryControllerClass from "./controller/category"
import OrderControllerClass from "./controller/order"


import DependencyContainer from "./configuration/dependencyContainer"



const dependency = new DependencyContainer();
dependency.register("encryption", EncryptionService);
dependency.register("tokenGeneration", TokenGeneratorService);
dependency.register("database", ValidationService);



const AuthController = new AuthControllerClass(dependency);
const UserController = new UserControllerClass(dependency);
const RoleController = new RoleControllerClass(dependency);
const CartController = new CartControllerClass(dependency);
const ProductController = new ProductControllerClass(dependency);
const CategoryController = new CategoryControllerClass(dependency);
const OrderController = new OrderControllerClass(dependency);



const port = dependency.get("port");



const authenticate = new AuthMiddleware(dependency.get("appSecretKey")).authenticate();



const app = express();


app.use(express.json());



app.use("/graphql", authenticate, graphqlHTTP( async (req: any) => {


        return {
            schema: new graphQLSchema().getSchema(),
            graphiql: true,
            context: {
                user: req.user,
                controller: {
                    AuthController,
                    UserController,
                    RoleController,
                    CategoryController,
                    CartController,
                    ProductController,
                    OrderController   
                }
            }
        }   
    }));


app.use((req: Request, res: Response)=>{
    return res.json(`URL Not Found ${req.originalUrl}`)
})

app.listen(port, ()=>{
    console.log(`server listening on port ${port}`);
})