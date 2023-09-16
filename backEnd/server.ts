import express, {Request, Response} from "express";


import Configuration from "./configuration/projectDependencies"

import CartRouter from "./infrastructure/routes/cart"

const { port, database, validation } = new Configuration().getConfiguration();


const app = express();


app.use(express.json());
app.use("/cart", new CartRouter({ port, database, validation } ).routes());


app.use((req: Request, res: Response)=>{
    return res.json(`Page Not Found ${req.originalUrl}`)
})

app.listen(port, ()=>{
    console.log(`server listening on port ${port}`);
})