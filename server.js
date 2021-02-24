const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require( 'morgan');
const passport = require('passport');
const connectDB = require('./config/db');
var cors = require('cors');

dotenv.config({path: './config/config.env'});

connectDB();

const transactions = require('./routes/Transactions');
const goals = require('./routes/Goals');



const app = express();
require('./config/passport')(passport);

// Passport middleware
app.use(passport.initialize());
app.use(cors());
app.use(passport.session());
app.use(express.json());

app.use('/api', transactions);
app.use('/api',goals);


const PORT = process.env.PORT || 5000;


app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

