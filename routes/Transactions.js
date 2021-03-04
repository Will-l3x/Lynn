const express = require('express');
const router = express.Router();
const {getTransactions, addTransaction, deleteTransaction} = require('../controllers/transaction');
const {getGoals, AddGoal, checkGoal, deleteGoal, updateGoal } = require('../controllers/Goals');
const {addAccount, checkAccount, updateAccount, deleteAccount, getAccounts} = require('../controllers/Accounts');
const {logIn, Register, Changepswd, getUsers} = require('../controllers/Auth')
const { forwardAuthenticated } = require('../config/auth');


////////////////////accounts routes/////////////////
router.post('/accounts', addAccount);
router.get('/account/:id', checkAccount);
router.post('/upadateaccount/:id', updateAccount);
router.delete('/accounts/:id', deleteAccount);
router.get('/accounts/:id', getAccounts); 

//transactions routes

router.get('/transactions/:id', getTransactions);
router.post('/transctions', addTransaction);
router.delete('/transaction/:id', deleteTransaction);

//goals routes
router.post('/goals', AddGoal);
router.get('/goals/:id', getGoals);
router.get('goal/:id', checkGoal);
router.delete('goals/:id', deleteGoal);
router.post('/updategoal/:id',updateGoal);
 
///////////////////////////authentification routes//////////////
router.post('/login', forwardAuthenticated, logIn);
router.post('/register', Register);
router.post('/changepswd', Changepswd);
router.get('/users', getUsers);


module.exports = router;