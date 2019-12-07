const express = require('express')
const User = require('./model')
const router = new express.Router()
router.post('/Sign-Up',async(req,res)=>{
    const user = new User(req.body)
    try{
      await user.save()
      res.send('Successfully Registered')
      }
      catch(e){
        res.send('Not Registered')  
        console.log(e)
    }
    
})
router.post('/login',async (req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.send("Login Failed!!")
    }
    })
module.exports  = router