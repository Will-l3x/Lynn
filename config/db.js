const mongoose = require('mongoose');

const  connectDB = async () =>{ 
    try{ 
        const conn = await mongoose.connect('mongodb+srv://Admin:Admin@pocket.c0vx1.mongodb.net/PocketWiz?retryWrites=true&w=majority',{
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true

        });
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
    }catch(err){
        console.log(`Error: ${err.message}`.red);
        process.exit(1);
    }
}

module.exports = connectDB;