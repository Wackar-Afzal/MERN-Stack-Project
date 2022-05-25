const { urlencoded } = require("body-parser");
const express =require("express");
const dotenv =require("dotenv").config();
const port=process.env.PORT || 8000;

const app=express();

// middleware
app.use(express.json())
app.use(urlencoded({extended:false}))

app.use("/api/goals",require("./routes/goalRoutes"))

app.listen(port,()=>console.log(`server started at ${port}`))