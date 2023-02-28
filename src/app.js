//npm i hbs@4.0.1
//RENDER  https://web-server-weather-app-sarahasan17.onrender.com"
//Express documentation->Api Reference
//nodemon src/app.js -e js,hbs
//npm i request@2.88.0
const forecast=require('../utils/forecast')
const geocode=require('../utils/geolocator')
const express=require('express')
const path=require('path')
const hbs=require('hbs')
//console.log(__dirname)
const app=express()
//define paths for express config
const pathhtml=path.join(__dirname,'../public')
//customizing views
const viewpath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')

//set up handlebars, engines and views location
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialspath)

//set up static directory to serve
app.use(express.static(pathhtml))
app.get('',(req,res)=>{
    res.render('index',{
        title:'alhamdulillah',
        name:'sara'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Sara'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        name:'sara',
        help:'Allah helps',
    })
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'Help sub folder not found',
        name:'Sara'
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({error:'Search not found'})
    }
     res.send({
        products:[]
     })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error:'Address not found'})
    }
    geocode(req.query.address,(error, {Latitude,Longitude,Location}={})=>{
        if(error){
            return res.send({error:'error found'})
        }
        forecast(Latitude, Longitude, (error, forcastdata) => {
            if(error){
                return res.send({error:'error found'})
            }
            // console.log(Location)
            // console.log(forcastdata)
            res.send({location:Location,
            data:forcastdata})
        })
      }) 
})
app.get('*',(req,res)=>{
    res.render('error',{
        title:'404 error found',
        name:'Sara'
    })
})


/*app.get('',(req,res)=>{
    res.send('<h1>BISMILLAH!!</h1>')//app.com
})
app.get('/help',(req,res)=>{
    res.send([{name:'Sara', age:18},{name:'Anas'}])
})
app.get('/about',(req,res)=>{
    app.use(express.static(pathhtml))
})*/
// app.listen(3000,()=>{
//     console.log("Running on port 3000")
// })



//app.com/help
//app.com/aboutus