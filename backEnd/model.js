const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    FirstName:{
     type:String
    },
    LastName:{
     type:String
    },
    email:{
        type: String,
        unique: true,
        //required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type:String,
        minlength:8,
        trim:true,
        validate(value){
          if(value.toLowerCase().includes('@')){
            throw new Error('password less than length of six "OR" it is equal to "password" ')
          }
        }
    },
    tokens:[{
      token:{
          type:String,
          required:true
      }        
    }
    ],

},{timestamps:true})
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString()},'hkgoel')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})
const User = mongoose.model('user',userSchema)
module.exports = User