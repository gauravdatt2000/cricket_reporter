import puppeteer from "puppeteer"

export async function run(url){
    
    const browser = await puppeteer.launch({ 
        headless : true ,
        defaultViewport: null,
        args:['--start-maximized' ]
    })

    try{
        
        const page = await browser.newPage() ;
        page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36 OPR/38.0.2220.41")
        await page.goto(url  ) ;

        // await page.mouse.down();

        for (let i = 0; i < 200; i++){
            await page.keyboard.press('ArrowDown')
        }

        const result = await page.evaluate( ()=>{

            let data1 = document.querySelectorAll("div.match-info.match-info-FIXTURES");
            let ipl_2021 = [] ;

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
                
                /* print test
                console.log("******************************************************");
                console.log(description);
                console.log( team1["name"] , team1["score"])
                console.log( team2["name"] , team2["score"])
                console.log(result);
                console.log("\n******************************************************\n\n");
                */
            
               ipl_2021.push(obj1) ;
                
            }


            return ipl_2021 ;

        } );

        // console.log(result) ;

        // process 
    
    
        // end
    
        // await browser.close() ;

        return result ;


    }
    catch(err){
        console.log("our err " , err )
    }
    finally{
        await browser.close();
    }

}