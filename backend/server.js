const express = require('express')
const bannerData = require('./bannerData')
const logoData = require('./logoData')
const dealData = require('./dealData')
const productData = require('./productData')
var cors = require('cors')
const app = express()
app.use(cors())

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/logo', function(req,res){
    res.send(logoData)
})

app.get('/banner', function(req,res){
    res.send(bannerData)
})

app.get('/deal', function(req,res){
    res.send(dealData)
})
app.get('/products', function(req,res){
    res.send(productData)
})

app.listen(8000)