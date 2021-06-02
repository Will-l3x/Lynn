const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require( 'morgan');
const passport = require('passport');
const connectDB = require('./config/db');
var cors = require('cors');
var helmet = require('helmet')


dotenv.config({path: './config/config.env'});

connectDB();

const transactions = require('./routes/Transactions');
const goals = require('./routes/Goals');



const app = express();
require('./config/passport')(passport);

// Passport middleware
app.use(passport.initialize());
app.use(cors());
app.use(helmet());
app.use(passport.session());
app.use(express.json());

app.use('/api', transactions);
app.use('/api',goals);




app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.yellow.bold)
})
//app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

