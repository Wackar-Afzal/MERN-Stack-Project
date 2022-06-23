const bodyParser = require("body-parser");
const path=require('path');
const express =require("express");
const colors=require("colors")
const connectDB =require("./config/db.js")
const dotenv =require("dotenv").config();
const {errorHandler}=require("./middleware/errorsMiddleware")
const port=process.env.PORT || 8000;

connectDB();

const app=express();

// middleware

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/api/goals",require("./routes/goalRoutes"))
app.use("/api/users",require("./routes/userRoutes"))

// Server frontend
if(process.env.Node_ENV==='production'){
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'../','frontend','build','index.html')))
}else{
    app.get('/',(req,res)=>res.send("this is not production mode "))
}

// app.use((req,res,next)=>{
//     res.status(404)
//     throw new Error("wrong api adddress was hitted")
//     next();
// })

app.use(errorHandler)

app.listen(port,()=>console.log(`server started at ${port}`))