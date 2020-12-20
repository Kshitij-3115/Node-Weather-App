
const request =  require('postman-request')


const getForecast = (latitude, longitude, callback)=>{
   const  url = 'http://api.weatherstack.com/current?access_key=358307f5edda17a0a6ffdfcb496dff43&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=m'  //forecast request url string
  
   
    request({url,json : true},(error,{body}={})=>{
       console.log(body);
       console.log(body);
        if(error){
            callback('Unable to connect weather services. looks like you have not active internet connection!',undefined);
        }else if(body.error){
            callback('Invalid location, search for valid location',undefined);
        }else{
            callback(undefined,{
                temperature: body.current.temperature,
                feelslike:body.current.feelslike
            })
        }
    })
}


module.exports = getForecast ;

