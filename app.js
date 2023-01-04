const express = require('express')
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const mime = require('mime');

const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})


function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};
  
    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }
  
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
  
    return response;
}



app.post("/upload", (req, res, next) => {

    const imgB64Data = req.body.b64
    const name = req.body.name
    const folder_location = `./images/${name}/`

    
    // ! Making Folder
    if (!fs.existsSync(folder_location)) {
        fs.mkdir(folder_location, (err) => {
            if (err) {
              console.error(err);
              res.json({msg: err});
              return
            } else {
              console.log('Folder created successfully');
            }
        });
    }
    

    // ! Getting Files count in folder
    fs.readdir(folder_location, (err, files) => {
        if (err) {
            console.error(err);
            res.json({msg: err});
            return
        } else {
            // ! =========================== Saving Image ==========================
            var decodedImg = decodeBase64Image(imgB64Data);
            var imageBuffer = decodedImg.data;
            var type = decodedImg.type;
            var extension = mime.getExtension(type);
            // var fileName =  `${files.length + 1}.` + extension;
            var fileName =  `${files.length + 1}.` + "jpg";
            try{
                fs.writeFileSync(folder_location + fileName, imageBuffer, 'utf8');
                res.json({msg: 'Image saved successfully'});
            }
            catch(err){
                console.error(err)
                res.json({msg: err});
            }
            // ! ===================================================================
        }
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})