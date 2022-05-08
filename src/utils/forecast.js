const request = require('postman-request');

const forecast = (adress , callback) => {
    const url = `http://api.weatherstack.com/current?access_key=fc1543e8c8b4a2bf1b1e5734f247eb19&query=${encodeURIComponent(adress)}&units=m`
    
    request({url, json:true}, (error, {body})=>{
        if(error) {
            callback("Unable to connet to the weather server", undefined);
        }else if(body.error){
            callback("Unable to find location, try another one",undefined);
        }else{
            callback(undefined,{
                temperature:body.current.temperature,
                feelslike:body.current.feelslike,
                description:body.current.weather_descriptions
            })
        }
    })


}

module.exports = forecast