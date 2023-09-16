

import orm from "../infrastructure/persistance/orm"
import Validator from "../infrastructure/validation/validation"

export default class Configuration{
    
    public port: any;
    public database: any;
    public validation: any;

    public appKey: any;
    public appAddress: any;

    constructor(){
        this.port = 3005;
        this.database = orm;
        this.validation = new Validator(),

        this.appKey = "eCommerceKey4466"
        this.appAddress = `http://localhost:${this.port}`
    }


    getConfiguration(){
        return {
            port: this.port,
            database: this.database,
            validation: this.validation 
        }
    }

    getApplicationConfiguration(){
        return {
           appKey: this.appKey, 
           appAddress: this.appAddress
        }
    }
    

}