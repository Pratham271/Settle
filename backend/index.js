const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors")
const rootRouter = require("./routes/index")

const app = express();

app.use(bodyParser.json())
app.use(express.json())
app.use(cors())

app.use("/api/v1", rootRouter)

app.listen(3000, ()=> {
    console.log("Listening on port 3000")
})

