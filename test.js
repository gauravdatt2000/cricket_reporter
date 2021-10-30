const minimist = require("minimist");
const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");

// pdfkit lib
const PDFDocument = require('pdfkit');
const doc = new PDFDocument();

// let arg = minimist(process.argv);
// console.log(arg)

// ipl
// const url = "https://www.espncricinfo.com/series/ipl-2021-1249214/match-results";

// worldcup t20
const url = "https://www.espncricinfo.com/series/icc-men-s-t20-world-cup-2021-22-1267897/match-results";

// https://www.espncricinfo.com/series/icc-men-s-t20-world-cup-2021-22-1267897/match-results
axios.get(url).then(function (res){
    fs.writeFileSync("one.html" , res.data , "utf8") ;
}).catch(function (err){console.log(err)})

// data got updated in one.html
let d1 = fs.readFileSync("one.html" , "utf8" ) ;
// console.log(d1)

// render the data  && push it inside object
// document.querySelectorAll("div.match-info.match-info-FIXTURES")
const dom = new JSDOM(d1);

// all relavent data
const data1 = dom.window.document.querySelectorAll("div.match-info.match-info-FIXTURES")

// console.log(data1.length)
let ipl_2021 = [] ;

// create pdf
doc.pipe(fs.createWriteStream('output.pdf'));

// heading of the file 
doc.fontSize(25).text('Some text with an embedded font!', 100, 100);

for(let i=0 ; i<data1.length; i++){
    
    let obj1 = {} ;

    let match_data = data1[i]  ;
    let description = match_data.querySelector("div.description").textContent ;
    
    // thera are ony two team heance queryselectorall
    let Both_team = match_data.querySelectorAll(".team") ;

    // created two object;
    let team1 = {} ;
    let team2 = {} ;
    
    // push data in team 1

    // *** bug img not getting loaded properly
    team1["img"] =  Both_team[0].querySelector(".img ").src; 
    team1["name"] = Both_team[0].querySelector(".name ").textContent;
    team1["score"] = Both_team[0].querySelector(".score").textContent;
    
    
    // push data in team 2
    team2["img"] =  Both_team[1].querySelector(".img ").src;
    team2["name"] = Both_team[1].querySelector(".name ").textContent;
    team2["score"] = Both_team[1].querySelector(".score").textContent;
    
    let result = match_data.querySelectorAll("span")[5].textContent;
    
    obj1["description"] = description ;
    obj1["team1"] = team1 ;
    obj1["team2"] = team2 ;
    obj1["result"] = result ;
    
    // /* print test
    console.log("******************************************************");
    console.log(description);
    console.log( team1["name"] , team1["score"])
    console.log( team2["name"] , team2["score"])
    console.log(result);
    console.log("\n******************************************************\n\n");
    // */



    // processing in doc  

    doc.addPage().fontSize(15).text( ` ${ description } ` , 25 , 250) ;
    doc.fontSize(15).text( ` ${ team1["name"]  }  ${ team1["score"] } ` , 25 , 300 );
    doc.fontSize(15).text( ` ${ team2["name"]  }  ${ team2["score"] } ` , 25 , 350 );
    doc.fontSize(15).text( ` ${ result  } ` , 25 , 400 );

    // the end 


   ipl_2021.push(obj1) ;
    
}

// console.log(ipl_2021) ;
let d11 = JSON.stringify(ipl_2021) ;
fs.writeFileSync("ipl.json" , d11 ,  "utf8" ) ;
// let data =

doc.end();
// pdf saved