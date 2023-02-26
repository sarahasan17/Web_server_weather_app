const request=require('request')
const forecast= (latitude,longitude,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=dd63605b76217bf67667058aee08a6ee&query="+latitude+","+longitude+"&units=f"
    request({url,json:true},function(error, {body}={}){
        if(error){
            callback('Could\'nt connect to network',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
           }
           else{
            callback(undefined,body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+" degree out.There is "+body.current.precip+"% chance of rain")
           }
    })
}

// const url='http://api.weatherstack.com/current?access_key=dd63605b76217bf67667058aee08a6ee&query=37.8267,-122.4233&units=f'
// request({url:url, json:true}, function (error, response) {
//     //const data=JSON.parse(response.body) //when we don't set the json to true
//     //console.log(data.current.pressure) // Print the error if one occurred
//     //console.log(response.body.current)
//     if(error){
//         console.log('Could\'nt connect to network')
//     }else if(response.body.error){
//         console.log('Unable to find location')
//     }
//     else{
//         console.log(response.body.current.weather_descriptions[0]+'. It is currently '+response.body.current.temperature+" degree out.There is "+response.body.current.precip+"% chance of rain")
//         //TERMINAL OUTPUT- Sunny. It is currently 52 degree out.There is 0% chance of rain
//     }
    
// });

module.exports=forecast