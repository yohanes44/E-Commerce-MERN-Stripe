import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default class Encryption {
     
    constructor(){

    }

    async hash(password: any){
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }

    async compare (hashedPassword: any, password: any){
        const userHash = await bcrypt.compare(password, hashedPassword);
        // console.log("hash Service result ", userHash);
        if(userHash){
            return true;
        }
        if(!userHash){
            return false;
        }
    }


}