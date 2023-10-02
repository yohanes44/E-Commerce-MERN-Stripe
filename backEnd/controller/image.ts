


import path from "path"
import fs from "fs"

module.exports = {
    register:  (req: any, res: any) => {
        const {picture} = req.files;
        const imagePath = path.join(__dirname, 'application/images/product', picture.name); // Adjust the file path and extension
    
        picture?.mv(imagePath, (err: any) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ message: 'Error saving image.' });
            }
            
            const imageUrl = `${req.protocol}://${req.hostname}:${req.socket.localPort}/images/${picture.name}`;
    
            return res.json({ imageUrl: imageUrl });
          }) 
    },
    get: (req: any, res: any) => {
        const {imageId} = req.params;
        const imagePath = path.join(__dirname, 'application/images/product', imageId); // Adjust the file path and extension

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