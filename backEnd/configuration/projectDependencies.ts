

import orm from "../infrastructure/persistance/orm"
import Validator from "../infrastructure/validation/validation"

export default class Configuration{
    
    public port: any;
    public database: any;
    public validation: any;

    constructor(){
        this.port = 3005;
        this.database = orm;
        this.validation = new Validator()
    }

    getConfiguration(){
        return {
            port: this.port,
            database: this.database,
            validation: this.validation 
        }
    }
}