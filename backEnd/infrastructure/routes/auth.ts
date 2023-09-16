import express, {Request, Response} from "express";


export default class CartRouter {
    
    public router: any;
    public dependencies: any;

    constructor(dependencies: any){
        this.router = express.Router();
        this.dependencies = dependencies;
    }

    routes(){

        this.router.get("/login", async (req: Request, res: Response)=>{
            // const users = await this.dependencies.database.user.findMany();
            // return res.json(users);
        });
        
        this.router.post("/logout", (req: Request, res: Response)=>{
            //  return res.json(this.dependencies.validation.isInt(req.body.name));
        });

        return this.router;
    }

}