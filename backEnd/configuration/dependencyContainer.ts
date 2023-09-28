
import orm from "../infrastructure/persistance/orm"



export default class DependencyContainer{

    private dependencyList: any = {}  

    constructor(){
        this.dependencyList = {                
            port:  3005,
            appSecretKey: "eCommerceKey4466"
        };
    }


    register(name: string, dependency: any){
        this.dependencyList[name] = new dependency();
    }

    get(name: any){
        if(!this.dependencyList[name]){
            throw Error(`dependency ${name} not registered`)
        }

        return this.dependencyList[name];
    }



}