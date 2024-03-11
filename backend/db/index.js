const mongoose = require('mongoose')
const { number } = require('zod')

mongoose.connect("mongodb://localhost:27017/paytm")
.then(()=> console.log("connected to mongodb"))
.catch((e)=> console.log(e.message))

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    }
})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    balance:{
        type: Number,
        required:true
    }
    
})

const User = mongoose.model("user", userSchema)
const Account = mongoose.model("account", accountSchema)

module.exports = {User,Account}