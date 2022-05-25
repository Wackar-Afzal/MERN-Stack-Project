// @des getGoals
// @route GET /api/goal
// @acess private
const getGoals=(req,res)=>{
    res.status(200).json({message:"Get goal"});
}

// @des setGoals
// @route POST /api/goal
// @acess private
const setGoals=(req,res)=>{
    if(!req.body.text){
    res.status(400)
    throw new Error("Please add goal")
    }
    res.status(200).json({messae:"set goal"})
  
}

// @des updatetGoals 
// @route PUT /api/goal/:id
// @acess private
const updateGoals=(req,res)=>{
    res.status(200).json({message:`update goal ${req.params.id}`})
}

// @des deleteGoals
// @route POST /api/goal/:id
// @acess private
const deleteGoals=(req,res)=>{
    res.status(200).json({message:`delete goal ${req.params.id}`})
}




module.exports={getGoals,setGoals,updateGoals,deleteGoals};
