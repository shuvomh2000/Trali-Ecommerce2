const express = require('express')
const bannerData = require('./bannerData')
const logoData = require('./logoData')
const dealData = require('./dealData')
const productData = require('./productData')
const mongoose = require('mongoose');
const User = require('./Model/usermodel.js')
const Storename = require('./Model/storenamemodel.js')
const Product = require('./Model/productmodel.js')
const Productposition = require('./Model/productpositionmodel.js')
const Coupon = require('./Model/couponModel.js')

const bcrypt = require('bcrypt');


const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
mongoose.connect('mongodb+srv://shuvomh:01738622011@cluster0.onlmngs.mongodb.net/trali2?retryWrites=true&w=majority',()=>{
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
    const data = await User.find({Email:req.body.email})
    console.log(req.body.email)
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

app.put('/vendor/:id', (req,res)=>{
     User.findByIdAndUpdate(req.params.id,{isVendor: true},{new: true},function (err,docs){
        if(err){
            console.log(err)
        }else{
            res.send(docs)
        }
    })
})

app.post('/storename',(req,res)=>{
    let storenameInfo = {
        storename: req.body.storename,
        owner: req.body.owner,
        ownername: req.body.ownername
    }
    const storename = new Storename(storenameInfo)
    storename.save()
    res.send(storename)
})

app.get('/storename/:id',async(req,res)=>{
        const data = await Storename.find({owner:req.params.id})
    res.send(data)
})

app.put('/storename',(req,res)=>{
    Storename.findByIdAndUpdate(req.body.id,{storename: req.body.storename},function (err,docs){
        if(err){
            console.log(err)
        }else{
            console.log(docs)
        }
    })
})

app.delete('/storename/:id',(req,res)=>{
    console.log(req.params)
    Storename.findByIdAndDelete(req.params.id,function (err,docs){
        if(err){
            console.log(err)
        }else{
            res.send('delete complete')
            console.log(docs)
        }
    })
})

app.post('/productupload',(req,res)=>{
    productuploadInfo ={
        name:req.body.name,
        brand:req.body.brand,
        image:req.body.image,
        category:req.body.category,
        price:req.body.price,
        color:req.body.color,
        size:req.body.size,
        description:req.body.description
    }
    const productupload = new Product(productuploadInfo)
    productupload.save()
})

app.get('/products',async function(req,res){
    let data = await Product.find({})
    console.log(data)
    res.send(data)
})

app.post('/productposition', (req,res)=>{
    console.log(req.body.name)
    let ProductPositionInfo ={
        label : req.body.name
    }
    const ProductPosition = new Productposition(ProductPositionInfo)
    ProductPosition.save()
    res.send(ProductPosition)
})

app.get('/productposition',async (req,res)=>{
    let data = await Productposition.find({})
    res.send(data)
})

app.post('/coupon',async (req,res)=>{
    let couponInfo = {
        coupon: req.body.coupon,
        discount: req.body.discount,
    }
    const coupon = new Coupon(couponInfo)
    coupon.save()
})

app.get('/coupon/:coupon',async (req,res)=>{
  let data = await Coupon.find({coupon: req.params.coupon})
  res.send(data)
})

app.get('/productdetails/related/:brand', async (req,res)=>{
    let data = await Product.find({brand:req.params.brand})
    console.log(data)
    res.send(data)
})

app.get('/productdetails/:id', async (req,res)=>{
    let data = await Product.findById(req.params.id)
    res.send(data)
})


app.get('/shop/brand/zara',async function(req,res){
    let data = await Product.find({brand:"zara"})
    res.send(data)
})

app.get('/shop/brand/easy',async function(req,res){
    let data = await Product.find({brand:"easy"})
    res.send(data)
})

app.get('/shop/category/man',async function(req,res){
    let data = await Product.find({category:"man"})
    res.send(data)
})

app.get('/shop/category/women',async function(req,res){
    let data = await Product.find({category:"women"})
    res.send(data)
})

app.get('/shop/category/kids',async function(req,res){
    let data = await Product.find({category:"kids"})
    res.send(data)
})


app.listen(8000,()=>{
    console.log('server running on port 8000')
})

