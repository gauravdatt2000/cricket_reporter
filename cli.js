// var  mn  = require('./main.js');
import { run } from './main.js';
// const express = require ('express') ;
import express from 'express';

const app = express()
// add1(2 ,3) ;

app.listen( 5000 )

app.get('/', function (req, res) {

    try{
        const url = "https://www.espncricinfo.com/series/icc-men-s-t20-world-cup-2021-22-1267897/match-results";
        run(url).then( (val1)=> res.send(val1)  ) 
    }
    catch (e){
        res.send(e)  ;    
    }

    // const data = fs.readFileSync('ipl.json','utf8' );
    // data = json.load(data) ;
    // res.send(data)

})


