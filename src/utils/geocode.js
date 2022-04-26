const request = require('postman-request');

const geocode = (adress, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(adress)}.json?access_token=pk.eyJ1IjoiY2VsaW9qb2FxdWltY3VtYmEiLCJhIjoiY2wxbWFreWIxMGloZDNwa3ExeTh3cWdtYiJ9.1INOog0h4wWjPsAeevDkhQ`
    request({url, json:true},(error,{body}) => {
        if(error) {
            callback('Unable to connect to location server', undefined);
        }else if(body.features.length ===0) {
            callback('Unable to find location. Try another search',undefined);
        }else{
            callback(undefined,{
                longitude:body.features[0].center[0],
                latitude:body.features[0].center[1],
                location: body.features[0].place_name
            })
        }


    })
}

module.exports = geocode