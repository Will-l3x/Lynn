const mongoose = require('mongoose');


const GoalsSchema = new mongoose.Schema({
    
    GoalName: { 
        type: String,
        trim: true,
        required: [true, 'Please enter the name for the savings coal'],

    },
    Amount: {
        type: Number,
        required: [true, 'enter the amount which you wish to reach']
    },
    addedAmount: {
         type: Number,
       default: 0
    },
    type: {
         type: String,
        trim: true,
        required: [true, 'Type of goal'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    dueAt:{
        type: Date,
        required: [false, 'Enter the targetted date for the savings']
    },
    user_id:{
        type: String,
        required: [true, 'please enter the user ID for the transaction'],
        trim: true,
    },
    status:{
        type: Boolean,
        required: [false, 'please verify if the goal has been reached or not']
    }

})

module.exports = mongoose.model('Goals', GoalsSchema)