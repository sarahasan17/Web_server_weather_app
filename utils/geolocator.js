const request=require('request')
const geocode=(address, callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2FyYWhhc2FuMTciLCJhIjoiY2xlOWk5ODNoMHBxejNwcjF1aDVwNWh6ZiJ9.ipx_k5cXaw8EDME2whP0Hw&limit=1'
    request({url, json:true},(error, {body}={})=>{
        if(error){
             callback('Unable to connect to network',undefined)//callback(error,response)
            }else if(body.features.length===0){
                callback('Unable to find location',undefined)
            }else{
                callback(undefined,{
                    Location:body.query[0],
                    Latitude:body.features[0].center[1], 
                    Longitude:body.features[0].center[0]}) //Latitude: 34.053691 Longitude: -118.242766
            }
        })
}

//Geocode
// const url2='https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic2FyYWhhc2FuMTciLCJhIjoiY2xlOWk5ODNoMHBxejNwcjF1aDVwNWh6ZiJ9.ipx_k5cXaw8EDME2whP0Hw&limit=1'
// request({url:url2, json:true},(error, response)=>{
//     if(error){
//         console.log('Unable to connect to network')
//     }else if(response.body.features.length===0){
//         console.log('Unable to find location')
//     }else{
//         console.log("Latitude: "+response.body.features[0].center[1]+" Longitude: "+response.body.features[0].center[0]) //Latitude: 34.053691 Longitude: -118.242766
//     }
// })


module.exports=geocode