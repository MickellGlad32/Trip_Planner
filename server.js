const http = require('http');
const express = require('express');
const db = require('./model/trips')

const exp = require('constants');
const { rawListeners } = require('process');
const { REPL_MODE_SLOPPY } = require('repl');
const trips = require('./model/trips');
const hostname = '127.0.0.1';
const port = 3000

let id = 3


const app = express();
app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false}))



const server = http.createServer(app)

app.get('/', (req, res)=>{
    res.render('home',{
        title: "Trips",
        Trips: trips
    })
})
app.get('/new', (req, res) =>{
    res.render('new', {
        title: "New Trip Form"
    })
})
app.post('/new', (req, res)=>{
    const newTrip = {
        id: id++,
        title:req.body.trip_title,
        departure_date: req.body.departure_date,
        return_date: req.body.return_date,

    }
    db.push(newTrip)
    console.log('New Trip Booked', newTrip)
    res.redirect('/')
})
// app.delete('/new', (req, res)=>{
//     let id = req.params.id
//     if (!Object.id.isValid(id))
// })


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});