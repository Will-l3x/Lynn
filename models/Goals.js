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
    }
})

module.exports = mongoose.model('Goals', GoalsSchema)