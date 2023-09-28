

import orm from "../infrastructure/persistance/orm"
import Validator from "../infrastructure/service/validation/validation"

import EncryptionService from "../infrastructure/service/authentication/encryption"
import TokenGeneratorService from "../infrastructure/service/authentication/tokenGenerator"

const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, '../controller');
const tsFiles = fs.readdirSync(folderPath).filter((file: any) => file.endsWith('.ts'));



export default class Configuration{
    
    private port: any;
    private database: any;
    private validation: any;

    private appSecretKey: any;
    private appAddress: any;

    private encryption: any;
    private tokenGenerator: any;

    constructor(){
        this.port = 3005;
        this.database = orm;
        this.validation = new Validator();

        this.appSecretKey = "eCommerceKey4466";
        this.appAddress = `http://localhost:${this.port}`;

        this.encryption = new EncryptionService();
        this.tokenGenerator = new TokenGeneratorService();        
    }

    



    getConfiguration(){
        return {
            port: this.port,
            database: this.database,
            validation: this.validation,
            appSecretKey: this.appSecretKey, 
            appAddress: this.appAddress,
            encryption: this.encryption,
            tokenGenerator: this.tokenGenerator 
        }
    }


     getControllers(){

        const controllers: any = []

        tsFiles.forEach(async (file: any) => {
            const filePath = path.join(folderPath, file);
            const Module = require(filePath).default;
            
            // Initialize the class with dependencies
            const myInstance = await new Module(this.getConfiguration());
            controllers.push(myInstance);
            
            // Use myInstance as neede
            // console.log(`Initialized instance from ${file}`);
          })

          return controllers;
    }

}