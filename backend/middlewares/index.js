const zod = require('zod');
const { User } = require('../db');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config');

const signupSchema = zod.object({
    firstName: zod.string().min(3),
    lastName: zod.string().min(3),
    username: zod.string().min(1).email(),
    password: zod.string().min(6)
})

const signinSchema = zod.object({
    username: zod.string().min(1).email(),
    password: zod.string().min(6)
})

const updateSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

const signupMiddleware = async(req,res,next) =>{
    const data = req.body;
    try {
        const parsedData = signupSchema.safeParse(data)
        if(!parsedData.success){
            return res.status(411).json({
                message: "wrong inputs"
            })
        }
        const user = await User.findOne({
            username: data.username})
        if(user){
            return res.status(403).json({
                message: "Username already exists"
            })
        }
        next();
    } catch (error) {
        res.status(500).json({
            errorMessage: error.message
        })
    }
}
const signinMiddleware = async(req,res,next) =>{
    const data = req.body;
    try {
        const parsedData = signinSchema.safeParse(data)
        if(!parsedData.success){
            return res.status(411).json({
                message: "wrong inputs"
            })
        }
        const user = await User.findOne({
            username: data.username})
        if(!user){
            return res.status(403).json({
                message: "Username does not exists"
            })
        }
        const verifyPass = await argon2.verify(user.password,data.password)
        if(!verifyPass){
            return res.status(411).json({message: "Wrong password"})
        } 
        req.userId = user._id
        next();
    } catch (error) {
        res.status(500).json({
            errorMessage: error.message
        })
    }
}

const updateMiddleware = async(req,res,next) => {
    const data = req.body
    try {
        const {success} = updateSchema.safeParse(data)
        if(!success){
            return res.status(411).json({
                message: "Error while updating information"
            })
        }
        next()
    } catch (error) {
        res.status(500).json({
            errorMessage: error.message
        })
    }
}

const authMiddleware = async(req,res,next) => {
    const authHeader = req.headers.authorization
    try {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(411).json({});
        }
        const words = authHeader.split(" ")
        const token = words[1]
        const {id} = jwt.decode(token)
        const user = await User.findById(id)
        if(!user){
            return res.status(411).json({
                message: "wrong token"
            })
        }
        req.userId = user._id
        // console.log()
        next();
    } catch (error) {
        res.status(500).json({
            errorMessage: error.message
        })
    }
}

module.exports = {signupMiddleware, signinMiddleware, authMiddleware, updateMiddleware}