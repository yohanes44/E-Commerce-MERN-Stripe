

import ProductInterface from "../interface/Product"

export default class Product{

    private name;
    private desc;
    private img;
    private brand;
    private color;
    private size;
    private price;
    private isActive;
    private quantity;
    private category;


    constructor({  name,
                   desc,
                   img,
                   brand,
                   color,
                   size,
                   price,
                   isActive,
                   quantity,
                   category
                }: ProductInterface){
            
        this.name = name;
        this.desc = desc;
        this.img = img;
        this.brand = brand;
        this.color = color;
        this.size = size;
        this.price = price;
        this.isActive = isActive;
        this.quantity = quantity;
        this.category = category;
    }


}