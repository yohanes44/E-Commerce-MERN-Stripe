import express, {Request, Response} from "express";


import  formidable from 'formidable';

import cors from "cors"

import path from "path"
import fs from "fs"

import fileUpload from 'express-fileupload';

// const { port, database, validation, appSecretKey, appAddress, encryption, tokenGenerator } = new Configuration().getConfiguration();

import {graphqlHTTP}  from "express-graphql";

import graphQLSchema from "./infrastructure/graphQL/schema"

import AuthMiddleware from "./infrastructure/middleware/auth";


import EncryptionService from "./infrastructure/service/authentication/encryption"
import TokenGeneratorService from "./infrastructure/service/authentication/tokenGenerator"
import ValidationService from "./infrastructure/service/validation/validation"
import ExceptionHandlingService from "./infrastructure/Exceptions/JoException"

import ImageController from "./controller/image"


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
dependency.register("imageController", ImageController);



const AuthController = new AuthControllerClass(dependency, ExceptionHandlingService);
const UserController = new UserControllerClass(dependency, ExceptionHandlingService);
const RoleController = new RoleControllerClass(dependency, ExceptionHandlingService);
const CartController = new CartControllerClass(dependency, ExceptionHandlingService);
const ProductController = new ProductControllerClass(dependency, ExceptionHandlingService);
const CategoryController = new CategoryControllerClass(dependency, ExceptionHandlingService);
const OrderController = new OrderControllerClass(dependency, ExceptionHandlingService);



const port = dependency.get("port");



const authenticate = new AuthMiddleware(dependency.get("appSecretKey")).authenticate();



const app = express();

app.use(cors())
app.use(fileUpload())
app.use(express.json());


  


app.use("/api/graphql", graphqlHTTP( async (req: any) => {

    ExceptionHandlingService.changeLanguage("amh");

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
                },
                exception: ExceptionHandlingService,
                dependency: dependency
            }
        }   
    }));

    
app.post("/api/image/:type/register", authenticate, dependency.get("imageController").register);


app.get("/api/image/:type/:imageId", authenticate, dependency.get("imageController").get);

app.get("/api/payment/chapa/verify/trx", async (req, res) =>{
    let userId = Number(req.query.userId);

    // userId = Numsber(userId);

    console.log("verify endPoint hitted"); 
   console.log({userId}); 

   let jo = await  OrderController.create({userId});
});


// let fileData = Buffer.alloc(0);

// req.on('data', (chunk) => {
//     console.log("data started");
//   fileData = Buffer.concat([fileData, chunk]);
// });

// req.on('end', () => {
//     console.log("data ended");
//     console.log(fileData);

//   if (fileData.length === 0) {

//     console.log(fileData);
//     return res.status(400).json({ message: 'No files were uploaded.' });
//   }

//   const fileName = 'test8.jpg'; // You can set a custom file name here
//   const filePath = path.join(__dirname, 'application/images/product', fileName);
  
//   fs.writeFile(filePath, fileData, (err: any) => {
    
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: 'Error saving file.' });
//     }

//     res.json({ message: 'File uploaded successfully', filename: fileName });
//   });

app.use((req: Request, res: Response)=>{
    return res.json(`URL Not Found man ${req.originalUrl}`)
})

app.listen(port, ()=>{
    console.log(`server listening on port ${port}`);
})