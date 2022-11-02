const express = require('express')
const mongoose = require('mongoose')
const bodyparser =require('body-parser')
const bcryptjs =require('bcryptjs')
const jsonwebtoken =require('jsonwebtoken')
const userRouter = require('./routes/userrouter')
const itemRouter =require('./routes/itemrouter')
//const cartRouter = require('./cartrouter')

const app = express()


mongoose.connect('mongodb+srv://anunyaanu:anunyachow123@cluster0.ipbfqc7.mongodb.net/?retryWrites=true&w=majority')

app.use((req,res,next) =>{

    res.header('Access-Control-Allow-Origin' , '*');
    res.header('Access-Control-Allow-Header' ,'Origin, X-Requested-With ,Content-Type,Accept,Autherization');
    if(req.method == 'Options'){
        res.header('Access-Control-Allow-Origin' , 'PUT,POST,GET,DELETE,PATCH');
        return res.status(200).json({});
    }
next();
});

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
 
app.use('/userRouter',userRouter)
app.use('/itemRouter',itemRouter)
//app.use(cartRouter)

module.exports = app;