const express = require('express')
const fs = require("fs")
const app = express()

app.get('/', function (req, res) {
    const data = fs.readFileSync('ipl.json','utf8' );
    // data = json.load(data) ;
    res.send(data)

})
 
app.listen(3000)