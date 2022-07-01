const express = require('express')
const bannerData = require('./bannerData')
const logoData = require('./logoData')
const dealData = require('./dealData')
const productData = require('./productData')
const mongoose = require('mongoose');
const User = require('./Model/usermodel.js')
const bcrypt = require('bcrypt');


const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
mongoose.connect('mongodb+srv://shuvomh:01738622011@cluster0.onlmngs.mongodb.net/trali?retryWrites=true&w=majority',()=>{
    console.log("DB Connected")
});



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

app.post('/Registration', function(req,res){
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        userInfo={
            Name:req.body.name,
            Email:req.body.email,
            Password:hash
        }
        const user = new User(userInfo)
        user.save()
    });
    
})

app.post('/login',async function(req,res){
    const data = await User.find({email:req.body.email})
    if(data[0]){
        bcrypt.compare(req.body.password, data[0].Password, function(err, result) {
            if(result){
                res.send({data:data[0],msg:'login successsfull'})
            }else{
                res.send('password not matched')
            }
        })
    }else{
        res.send('data nai')
    }
})

app.put('/vendor/:id',async (req,res)=>{
    console.log(req.params)
    const data = await User.findByIdAndUpdate(req.params.id,{idVendor: true},function (err,docs){
        if(err){
            console.log(err)
        }else{
            console.log(docs)
        }
    })
})

app.listen(8000,()=>{
    console.log('server running on port 8000')
})