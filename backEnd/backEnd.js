const express = require('express')
const path = require('path')
const userRouter = require('./user')
const bodyParser = require('body-parser');
const User = require('./model.js')
const mongoose = require('./mongoose.js')

const app = express()
app.use(express.json())
const directoryPath = path.join(__dirname,"../ecommarce-master/src")
console.log(directoryPath)
app.use(express.static(directoryPath))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000,()=>{
    console.log("Heyy")

})
app.use(userRouter);