
import orm from "../infrastructure/persistance/orm"
// import Error from "../infrastructure/persistance/orm"

import EncryptionService from "../infrastructure/service/authentication/encryption"


export default class DependencyContainer{

    private dependencyList: any = {}  

    constructor(){
        this.dependencyList = {                
            port:  3005,
            appSecretKey: "eCommerceKey4466",
            STRIPE_KEY: "sk_test_51LwXhNFGqQ7awyAKHlhFIarqvyWNUzPV1XRxdbsUZD0wyHgabXdRGPvWG1dhVvI7LpqAAdwzx4inFB1cOviCUL1a00K1WT2stM",
            enc: new EncryptionService(),
            chapaTestPublicKey: "CHAPUBK_TEST-f8mLsqVcg8uHJkM4rVTePiZCaiwWZPCh",
            chapaTestSecretKey: "CHASECK_TEST-3bHwIBA6dj0iCWRR1PCmaXOxKwExzB4d",
            chapaEncryptionKey: "pEzoC1x9H8ZIHSsofyH7GkMd"
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