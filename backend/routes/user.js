const {Router} = require("express");
const {signupMiddleware,signinMiddleware, authMiddleware, updateMiddleware} = require("../middlewares");
const { User, Account } = require("../db");
const  argon2  = require("argon2");
const JWT_SECRET = require("../config");
const jwt = require('jsonwebtoken')
const router = Router();

router.post('/signup', signupMiddleware, async(req,res)=> {
    const {firstName,lastName,username,password} = req.body;
    const hash = await argon2.hash(password)
    const user = await User.create({
        firstName,
        lastName,
        username,
        password: hash
    })
    Account.create({
        userId: user._id,
        balance: (1 + Math.random() * 10000).toFixed(2)
    })

    res.status(201).json({
        message: "user created successfully"
    })
   
})

router.post('/signin', signinMiddleware, async(req,res)=> {
    const id = req.userId;
    try {
        const token = jwt.sign({id},JWT_SECRET)
        res.status(200).json({
            token: token
        })
    } catch (error) {
        res.status(500).json({
            errorMessage: error.message
        })
    }
})

router.put('/', updateMiddleware,authMiddleware, async(req,res)=> {
    const id = req.userId;
    const {password,firstName,lastName} = req.body
    try {
        
        const hash = await argon2.hash(password)
        await User.updateOne({_id: id},{
            firstName:firstName,
            lastName:lastName,
            password:hash
        })
        res.status(200).json({
            message: "Updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            errorMessage: error.message
        })
    }
    
})

router.get('/bulk', authMiddleware,async(req,res)=> {
    const filter = req.query.filter || "";
    try {
        const users = await User.find({
            "$or": [
                {
                    firstName: {
                        "$regex": filter
                    }
                },
                {
                    lastName: {
                        "$regex": filter
                    }
                }
            ]
        })
        if(!users){
            return res.status(411).json({})
        }
        res.status(200).json({
            user: users.filter(user => String(user._id) !== String(req.userId))
                .map((user)=> ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        })
    } catch (error) {
        res.status(500).json({
            errorMessage: error.message
        })
    }
    
})

router.get('/me', authMiddleware, async(req,res)=> {
    const user = await User.findOne({_id: req.userId})
    res.status(200).json({
        message: "Your token is valid",
        firstName: user.firstName
    })
})
module.exports = router