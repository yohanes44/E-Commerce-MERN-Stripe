



export default class Validator {

    public self: any;
    constructor(){
        this.self = this;
    }

    isString(value: string){
        return (typeof value === "string")   
    }

    isNotEmpty(value: any){    
        return (value !== '' && value !== null && typeof value !== 'undefined');
    }

    isInt(value: any){
        return Number.isInteger(value);
    }

    validate(value: any, rules: Array<string>){
        return rules.every((rule: any)=>{
            return this.self[rule](value)
        })
    }

} 

