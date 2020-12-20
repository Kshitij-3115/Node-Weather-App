
const request =  require('postman-request');



const geocode = (address, callback)=>{
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoia3NoaXRpai1raG90IiwiYSI6ImNraW5icmsxajExcXAyeHFqaGN0em9kamYifQ.8snIz6Lg5HfrCkZu0z4gVA&limit=1'  //mapbox geocoding request string

    request({url, json : true },(error,{body}={})=>{
        if(error){
            callback('Unable to connect location services! Try after some time.',undefined);
        }else if(body.features.length === 0){
            callback ('Unable to find the given location. please try another search!',undefined);
        }else{
          //add code to use the repsonse. 
          callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
              
          });
        }
        
    });

}


module.exports = geocode ;