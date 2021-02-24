const Accounts = require('../models/Accounts')

exports.addAccount = async (req, res, next)=>{
    try{
        const { AccountName, Currency,OpeningBalance, user_id} = req.body;

        const accounts = await Accounts.create(req.body);

             return res.status(201).json({
                success: true,
                data: accounts
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

exports.checkAccount = async (req, res, next)=>{
    try{
        const accounts = await Accounts.findById(req.params.id);

        if(!accounts){
            return res.status(404).json({
                success: false,
                error: "Account Not Found"
            })
        }
        return res.status(200).json({
            success: true,
            data: accounts
        })
    }catch (err){
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

exports.getAccounts = async (req, res, next)=>{
    try{
        const user_id = req.params.id
        Accounts.find({user_id: user_id }, (err, account)=>{
            if (!account){
                return res.status(404).json({
                    success: false,
                    error: 'user id not found in database'
                })
            }else {
                return res.status(200).json({ 
                    success: true,
                    count: account.length,
                    data: account
                })
            }
        });

        
    }catch (err){
        return res.status(500).json({
            success: false,
            error: 'server error contact admin'
        })
        
    }
}

exports.updateAccount = async (req, res, next)=>{
    try {
        const { AccountName, Currency,OpeningBalance, user_id} = req.body;

        const accounts = await Accounts.findById(req.params.id);

        if (!accounts){
            return res.status(404).json({
                success: false,
                error: 'No Account Found'
            })
        }

        await accounts.updateOne(req.body);
        return res.status(200).json({
            success: true,
            data: accounts
        });
    }catch (err){
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

exports.deleteAccount = async (req, res, next)=>{
    try {
        const accounts = await Accounts.findById(req.params.id);

        if (!accounts){
            return res.status(404).json({
                success: false,
                error: 'No Account found'
            })
        }

        await accounts.remove();
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