const Goals = require('../models/Goals')
//get all the goals for the user
exports.getGoals = async (req, res, next)=>{
   try{
        const user_id = req.params.id
        Goals.find({user_id: user_id}, (err, goal)=>{
            if (!goal){
                return res.status(404).json({
                    success: false,
                    error: 'user id not found in database'
                })
            }else {
                return res.status(200).json({
                    success: true,
                    count: goal.length,
                    data: goal,
                }) 
            }
        });
        
       
   }catch(err){
        return res.status(500)({
            success: false,
            error: 'server error',
        })
   }
} 

//get all the goals for the user
exports.AddGoal = async (req, res, next)=>{
    try{
        const { GoalName, Amount,addedAmount,type, createdAt,  dueAt, user_id} = req.body;

        const goals = await Goals.create(req.body);

             return res.status(201).json({
                success: true,
                data: goals
            })
    }catch (err){
        if(err.name === 'ValidationError'){
            const messages = Object.values(err.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages,
            })
        }else{
            return res.status(500).json({
                success: false,
                error: 'server error'
            }) 
        }
    }
}

//get all the goals for the user
exports.checkGoal = async (req, res, next)=>{
    try{
        const goals = await Goals.findById(req.params.id);

        if(!goals){
            return res.status(404).json({
                success: false,
                error: "Goal Not Found"
            })
        }
        return res.status(200).json({
            success: true,
            data: goals
        })
    }catch (err){
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

//get all the goals for the user
exports.deleteGoal = async (req, res, next)=>{ 
    try {
        const goals = await Goals.findById(req.params.id);

        if (!goals){
            return res.status(404).json({
                success: false,
                error: 'No Transaction Found'
            })
        }

        await goals.remove();
        return res.status(200).json({
            success: true,
            data: {}
        });
    }catch (err){
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

