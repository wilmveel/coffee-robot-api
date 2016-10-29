var express = require('express')

var  bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

var orders = [];


app.post('/neworder', function(req, res){

    var body = req.body;

    orders.push(body)
    res.sendStatus(200)
})


app.get('/takeorder', function(req, res){

    res.json(200, orders.shift())
})


if (process.env.mode === 'TEST')
    module.exports = {app:app, stack:orders};
else app.listen(process.env.PORT || 3000)

