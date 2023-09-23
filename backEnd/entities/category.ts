

import CategoryInterface from "../application/interface/Category"

export default class Category{

    private name;
  
    constructor({  name }: CategoryInterface){
        this.name = name;
    }


}