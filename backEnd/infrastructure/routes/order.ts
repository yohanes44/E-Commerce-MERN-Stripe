import express, {Request, Response} from "express";


export default class OrderRouter {
    
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

