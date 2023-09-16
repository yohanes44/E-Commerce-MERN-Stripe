import express, {Request, Response} from "express";


export default class CartRouter {
    
    public router: any;
    public dependencies: any;

    constructor(dependencies: any){
        this.router = express.Router();
        this.dependencies = dependencies;
    }

    routes(){

        this.router.get("/", async (req: Request, res: Response)=>{
            const users = await this.dependencies.database.user.findMany();
            return res.json(users);
        });
        
        this.router.post("/test", (req: Request, res: Response)=>{
             return res.json(this.dependencies.validation.isInt(req.body.name));
        });
      
        this.router.post("/", (req: Request, res: Response)=>{
            // return res.json("test route");
        });

        this.router.put("/", (req: Request, res: Response)=>{
            // return res.json("test route");
        });

        this.router.delete("/", (req: Request, res: Response)=>{
            // return res.json("test route");
        });

        return this.router;
    }

}

