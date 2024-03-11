const {Router} = require("express")
const userRouter = require("./user")
const accountRouter = require("./account")

const router = Router();


// to map all the requests coming to /api/v1/user to the userRouter file
router.use("/user", userRouter)

// to map all the requests coming to /api/v1/account to the userRouter file
router.use("/account",accountRouter)


module.exports = router