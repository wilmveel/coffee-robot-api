var express = require('express')

var  bodyParser = require('body-parser')

var WebSocketServer = require('ws').Server

var wss = new WebSocketServer({port:5555})







var app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

var orders = [];


app.post('/neworder', function(req, res){

    var body = req.body;
    console.log('BODY',body)
    orders.push(body)
    res.sendStatus(200)
})


app.get('/takeorder', function(req, res){

    res.json(200, orders.shift())
})

app.get('/stack', function(req, res){
    res.json(200, orders)
})

app.get('/stackview',function(req, res){
    res.sendFile(__dirname +'/web/stack.html')

})

app.use(express.static('web'))

if (process.env.mode === 'TEST')
    module.exports = {app:app, stack:orders};
else app.listen(process.env.PORT || 3000)

