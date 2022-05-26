const asyncHandler=require("express-async-handler")

const Goal=require("../models/goalsModel.js")

// @des getGoals
// @route GET /api/goal
// @acess private
const getGoals=asyncHandler(async(req,res)=>{
    const goals=await Goal.find()
    res.status(200).json({message:"Get goal request Completed",goal:goals});
})

// @des setGoals
// @route POST /api/goal
// @acess private
const setGoals=asyncHandler(async(req,res)=>{
    
    if(!req.body.text){
    res.status(400)
    throw new Error("Please add goal in form of text")
    }else{
        
        const goal=await Goal.create({
            text:req.body.text,

        })
        res.status(200).json({messae:"set goal",user:`${goal}`})}
        
})

// @des updatetGoals 
// @route PUT /api/goal/:id
// @acess private
const updateGoals=asyncHandler(async(req,res)=>{

    const goal=await Goal.findById(req.params.id)
    if(!goal){
        res.status(400) 
        throw new Error("Goal not find")
    }

    const updatedGoal= await Goal.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json({message:`updated goal from ${goal.text} to`, updatedGoal:updatedGoal.text})
})

// @des deleteGoals
// @route POST /api/goal/:id
// @acess private
const deleteGoals=asyncHandler(async(req,res)=>{
    const goal=await Goal.findById(req.params.id)
    if(!goal){
        res.status(400) 
        throw new Error("Goal not find")
    }

    await Goal.findByIdAndDelete(req.params.id,{confirm:true})
    res.status(200).json({message:`deleted goal ${goal.text}`})
})




module.exports={getGoals,setGoals,updateGoals,deleteGoals};
