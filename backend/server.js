const bodyParser = require("body-parser");
const express =require("express");
const dotenv =require("dotenv").config();
const {errorHandler}=require("./middleware/errorsMiddleware")
const port=process.env.PORT || 8000;

const app=express();

// middleware

app.use(express.json())
app.use(bodyParser.json())

app.use("/api/goals",require("./routes/goalRoutes"))
app.use((req,res)=>{
    
    res.status(404)
    throw new Error("wrong api adddress was hitted")
})

app.use(errorHandler)

app.listen(port,()=>console.log(`server started at ${port}`))