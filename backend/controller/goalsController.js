const asyncHandler=require("express-async-handler");

const Goal=require("../models/goalsModel.js");
const User=require("../models/userModel");

// @des getGoals
// @route GET /api/goals
// @acess private
const getGoals=asyncHandler(async(req,res)=>{
    const goals=await Goal.find({user:req.user.id})
    res.status(200).json(goals);  
})
  
// @des setGoals
// @route POST /api/goals
// @acess private
const setGoals=asyncHandler(async(req,res)=>{
    
    if(!req.body.text){
    res.status(400)
    throw new Error("Please add goal in form of text")
    }else{
        
        const goal=await Goal.create({
            text:req.body.text,
            user:req.user.id,

        })
        res.status(200).json(goal)}
        
})

// @des updatetGoals 
// @route PUT /api/goal/:id
// @acess private
const updateGoals=asyncHandler(async(req,res)=>{

    const goal=await Goal.findById(req.params.id)
    console.log(goal)
    if(!goal){
        res.status(400) 
        throw new Error("Goal not found while updating")
    }

    // Check for user
    if(!req.user){
        res.status(401)
        throw new Error("user not found...... while updating goal")
    }

    // making sure the looged in user is updating his own goals
    if(goal.user.toString()!==req.user.id){
        res.status(401)
        throw new Error("user not authorized...you are not allowed to update other goals")
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
    // Check for user
    if(!req.user){
        res.status(401)
        throw new Error("user not found...... while updating goal")
    }

    // making sure the looged in user is updating his own goals
    if(goal.user.toString()!==req.user.id){
        res.status(401)
        throw new Error("user not authorized...you are not allowed to update other goals")
    }
    await Goal.findByIdAndDelete(req.params.id,{confirm:true})
    res.status(200).json(goal._id)
})




module.exports={getGoals,setGoals,updateGoals,deleteGoals};
