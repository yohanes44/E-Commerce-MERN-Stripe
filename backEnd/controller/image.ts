


import path from "path"
import fs from "fs"

import {Request, Response} from "express"

import ExceptionHandlingService from "../infrastructure/Exceptions/JoException"

export default class ImageController {



    register(req: any, res: any): void {
      const {picture} = req.files;
      const {type} = req.params; 
      console.log("testtt");
       console.log(type);
      // console.log((picture.name).split(".")[0]);
       
        let imagePath: any = null;
        console.log(type == "product");
        
        if(type != "product" && type != "category"){
            console.log("hhh");
          return res.json('Error, unknown path');
        }
        if(type == "product"){
          imagePath = path.join(__dirname, '../application/images/product', picture.name);
        }
        if(type == "category"){
          imagePath = path.join(__dirname, '../application/images/category', picture.name)
        } 

        picture?.mv(imagePath, (err: any) => {
            if (err) {
              // trow this.dependencies.
              return res.status(500).json({ message: 'Error saving image.' });
            }
            
            const imageUrl = `${req.protocol}://${req.hostname}:${req.socket.localPort}/api/image/${type}/${picture.name}`;
    
            return res.json({ imageUrl: imageUrl });
          }) 
    }

    get(req: any, res: any): void {
        const {imageId} = req.params;
        const {type} = req.params; 
      // console.log("testtt");
      // console.log((picture.name).split(".")[0]);
       
        let imagePath: any = null;
        
        if(type != "product" && type != "category"){
          return res.json('Error, unknown path');
        }
        if(type == "product"){
          imagePath =path.join(__dirname, '../application/images/product', imageId); // Adjust the file path and extension
        }
        if(type == "category"){
          imagePath = path.join(__dirname, '../application/images/category', imageId); // Adjust the file path and extension
        } 

        fs.readFile(imagePath, (err, data) => {
            if (err) {
              console.error('Error reading the image file:', err);
              return res.status(500).send('Error reading image file');
            }
            res.contentType('image/jpeg'); // Adjust the content type as needed for your image format (e.g., image/png)
            res.send(data);
          });
  }
}