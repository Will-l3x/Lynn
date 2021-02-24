const Transaction = require('../models/Transactions')

//@desc get all transaction from the api
//connected to route Get /api/v1/transactions

exports.getTransactions = async (req, res, next)=>{ 
    try{
        const user_id = req.params.id
        Transaction.find({user_id: user_id}, (err, transactions)=>{
            if (!transactions){
                return res.status(500).json({
                    success: false,
                    error: 'no transactions recorded yet'
                }) 
            }else{
                return res.status(200).json({ 
                    success: true,
                    count: transactions.length,
                    data: transactions
                })
            }
        });  
    }catch (err){
        return res.status(500).json({
            success: false,
            error: 'server error'
        }) 
    }
}

//@desc Add a   transaction from the api
//connected to route Get /api/v1/transactions/:id

exports.addTransaction = async(req, res, next)=>{
    try{
        const { createdAt, PaymentMethod,Reccuring,Category,Vendor,amount,Account, user_id } = req.body;

        const transaction = await Transaction.create(req.body);

             return res.status(201).json({ 
                success: true,
                data: transaction
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

//@desc get all transaction from the api
//connected to route Get /api/v1/transactions

exports.deleteTransaction = async (req, res, next)=>{
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction){
            return res.status(404).json({
                success: false,
                error: 'No Transaction Found'
            })
        }

        await transaction.remove();
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