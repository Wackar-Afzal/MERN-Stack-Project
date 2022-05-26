const errorHandler=(err,req,res,next)=>{
    const status=res.statusCode? res.statusCode:500
    console.log(status)
    res.status(status)

    res.json({

        message:err.message,
        stack:process.env.Node_ENV==="production"?null:err.stack

    })

}

module.exports={
    errorHandler
}