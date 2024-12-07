const express = require("express");
const app = express();
const bodyP= require("body-parser");
// const compiler = require("compilex");
const path = require('path');
//const { error } = require("console");
// const options= {stats : true};
// compiler.init(options);
app.use(bodyP.json());
app.use(express.static('public'));

app.get("/code",(req,res)=>
{
   
   res.sendFile(path.join(__dirname,'public','index.html'));
})
app.listen(8080);



app.post("/compile",(req,res)=>
{
   let exportData={};
   const {code, input, lang}=req.body;
   
     
    console.log(code,input,lang);
     


//  JDoodle Integration
      //  const clientId= 'ee7e1d57add0484a392c696be99ef8ab';
      const clientId='38e530e1dab567258e0a0ace15a21591';
      //   const clientSecret= '2d08aed6902d9d23d42f36b791725cd28d348fbeae4ef2b436683c2b171df2f5';
      const clientSecret='e24a1cf7378a4373cc1409794375dfa3b9fd173716ed4de8f2c9d0889f78c47a';
         // "script": "print(\"Hello, World!\")",
         // "stdin": "",
         // "language": "python3",
         // "versionIndex": "3",
         // "compileOnly": false

         const requestData = {
            script : code,
            language : 'java',
            versionIndex : '3',
            clientId: clientId,
            clientSecret : clientSecret,
            stdin: input
         }
         console.log(requestData);

       async function fetchData() {
         
       
        fetch("https://api.jdoodle.com/v1/execute", {method: "POST",headers:{'Content-Type':'application/json'}, body: JSON.stringify(requestData)})
        .then(response =>
        {
               if(!response.ok)
               {
                  throw new Error("Http Error, Unable to Establish Connnections With API");
               }
              return response.json();
              

         })
         .then(data=>
         {
           console.log("Here is Data------->", data);
         //   exportData ={
         //      statusCode : 200,
         //      output: data.output,
         //      memory: data.memory,
         //      cpuTime: data.cpuTime,
              
         //   };
            res.json(data);
           //console.log("Here is Export Data------->", exportData);
           
            }
         )
         .catch(error=>
            console.log(error)
         );

         

      }
      
      fetchData();
      
      //res.json(exportData);

         // 
         // Important above
   // // try{
   // //      if(!input)
   // //      {
   // //          if(lang == "Java")
   // //          {
   // //             var envData = { OS : "windows"}; 
               
   // //             compiler.compileJava( envData , code , function(data){
   // //                   if(data.output)
   // //                   {
   // //                   res.send(data);
   // //                   }
   // //                   else
   // //                   res.send({output:"error"});
   // //              }); 
   // //          }
   // //          else if(lang == "Python")
   // //          {
                               
   //                var envData = { OS : "windows"};  
   //                compiler.compilePython( envData , code , function(data){
   //                   if(data.output)
   //                      {
   //                      res.send(data);
   //                      }
   //                      else
   //                      res.send({output:"error"});
   //                });    
   //          }
            
   //      } 
   //      else if(input)  
   //      {
   //       if(lang == "Java")
   //       {
            
   //          var envData = { OS : "windows"}; 
   //          compiler.compileJavaWithInput( envData , code , input ,  function(data){
   //             if(data.output)
   //             {
   //             res.send(data);
   //             }
   //             else
   //             res.send({output:"error"});
   //          });
   //       }
   //       else if(lang=="Python")
   //       {
             
   //             var envData = { OS : "windows"}; 
   //             compiler.compilePythonWithInput( envData , code , input ,  function(data){
   //                if(data.output)
   //                   {
   //                   res.send(data);
   //                   }
   //                   else
   //                   res.send({output:"error"});
   //             });
   //       }
   //      }
        


   //  }
   //  catch(e)
   //  {
   //     console.log(e);
   //  }

});