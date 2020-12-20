const path = require('path');
const express = require('express');
const hbs =  require('hbs');
const app = express() ; 

const port = process.env.PORT  || 3000;

const geocode = require('./utilities/geocode');
const getForecast = require('./utilities/forecast');
// base url : app.com
// app.com/about, app.com/help,app.com/weather like urls can be accessed via browser

//defining paths for express configurations
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//setting up handlebars engine and views location
app.set('view engine','hbs');   ///setting up templete engine 
app.set('views',viewsPath);     //telling express to look up viewsPath as views directory
hbs.registerPartials(partialsPath);
// setting up static directory for serve
app.use(express.static(publicDirPath));

//setup of routes
app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather application',
       content : 'weather application is the app that provides the weather content',
       name:'Kshitij khot'
    });
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About Auther',
       content : 'this is the about page of weather application',
       name : 'Vishal kumar'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'help page',
      content : ' mobile number  : 9511548390',
      name : 'Digvijay kumar'
    })
})
app.get('/weather',(req,res)=>{
    const address = req.query.address ; 
    if(!address){
        return res.send({
            error : 'please provide the address to display weather'
        })
    }

    geocode(address, (error,{latitude,longitude,location}={})=>{
  
        if(error){
         return res.send({
             error
         })
        }
      
         getForecast(latitude,longitude,(error,{temperature,feelslike}={})=>{
             if(error){
                 return res.send({
                     error
                 })
             }

             res.send({
                 location,
                 temperature,
                 feelslike
             })
            
         });  
     });
   
})
//routes for 404 errors
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title :'error page',
        
        name : 'sathwik reddy',
        errorMessage: 'help article not found'
    })
})
app.get('*',(req,res)=>{
   res.render('404',{
       title : 'error page',
      
       name : 'Adarsh kumar',
       errorMessage : 'Error 404 occurred , page not found'

   })
})

//setting up port number and tell our server to listen
app.listen(port,()=>{
    console.log(`listening on port number ${port}`);
})
