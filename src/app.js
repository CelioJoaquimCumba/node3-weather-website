const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express();


const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

hbs.registerPartials(partialsPath)


app.set('view engine','hbs')
app.set('views',viewsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather app',
        name:'Celio'
    })
})
app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'about me',
        name:'Celio'
    })
})
app.get('/help', (req, res)=>{
    res.render('help',{
        helpMessage: 'This is a help message',
        title: 'help',
        name:'Celio'
    })
})
app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'no address entered'
        })
    }
    geocode(req.query.address, (error,{latitude,longitude,location})=>{
        if (error) return res.send({error:error});
        forecast(req.query.address, (error, forecastData)=>{
            if(error) return res.send({error:error});
            
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })


    })
    
    // res.send({
    //     'forecast':'It is snowing',
    //     'location':'Maputo',
    //     'address':req.query.address
    // })
})
app.get('/products',(req, res)=>{
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products :[]
    })
})
app.get('/help/*', (req, res)=>{
    res.render('404Page',{
        message: 'Help page not found',
        title: 'help',
        name:'Celio'
    })
})
app.get("*",(req, res)=>{
    res.render('404Page',{
        message: 'page not found',
        title: 'help',
        name:'Celio'
    })
})
app.listen(4000, ()=>{
    console.log('Server is up on port 4000.')
})