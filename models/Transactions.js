const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    Account: {
        type: String,
        trim: true,
        required: [true, 'please add the name of the account for deductin']
    },
    amount: {
        type: Number,
        required: [true, 'please add a figure for the transaction']
    },
    Vendor: {
        type: String,
        required: false,
        trim: true,
    },
    Category: {
        type: String,
        required: [true, 'please enter the category of the expense'],
        trim: true
    },
    Reccuring: {
        type: String,
        required: [true, 'enter frequency of expense'],
        trim: true,
    },
    PaymentMethod:{
        type: String,
        required: [true, 'enter payment method'],
        trim: true
    },
    type:{
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now 
    },
    user_id:{
        type: String,
        required: [true, 'please enter the user ID for the transaction'],
        trim: true,
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema); 