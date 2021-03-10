const Auth = require('../models/Auth')
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');


exports.logIn =  (req, res, next)=>{
    const { Email, password, password2,  FirstName, LastName, PhoneNumber} = req.body;
    let errors = [];

   if ( !Email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
      }


      Auth.find({ Email: Email }, (err, user) => {

        if (!user) {

         return res.status(404).json({ 
             success: false, 
             message: 'User email not found!'
             });
         } else {
          bcrypt.compare(password, user[0].password).then((result)=>{
            if(result){
              console.log("authentication successful")
              return res.status(201).json({
                success: true,
                message: 'Log in successful',
                data: user,
              })
            } else {
              console.log("authentication failed. Password doesn't match")
              res.status(400).json({
                message: 'Password is incorrect!',
                success: false,
            })
            }
          })
          .catch((err)=>console.error(err))
         }
        })  
        
        
       
        

}



exports.Register = async (req, res, next)=>{ 
    try{
        const { Email, password, password2,  FirstName, LastName, PhoneNumber} = req.body;
        let errors = [];

        if ( !Email || !password || !password2) {
            errors.push({ msg: 'Please enter all fields' });
          }
        
          if (password != password2) {
            errors.push({ msg: 'Passwords do not match' });
          }
        
          if (password.length < 6) {
            errors.push({ msg: 'Password must be at least 6 characters' });
          }
        
          if (errors.length > 0) {
            res.send('register', {
              errors,
              
              Email,
              password,
              password2
            });
          } else {
            Auth.findOne({ Email: Email }).then(user => {
              if (user) {
                errors.push({ msg: 'Email already exists' });
                res.status(201).json({
                success: false,
                  errors,
                  
                  
                });
              } else {
                const newUser = new Auth({
                  
                  Email,
                  password,
                  FirstName,
                  LastName
                });
        
                bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                      .save()
                      .then(user => {
                        return res.status(201).json({
                            success: true,
                            message: "Account Created Successfully You can login",
                            
                        })
                      })
                      .catch(err => console.log(err));
                  });
                });
              }
            });
        }

       

       // const auth = await Auth.create(req.body);

            
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

exports.Changepswd = async (req, res, next)=>{
    try{
      const { Email} = req.body;
      var nodemailer = require('nodemailer');
      var generator = require('generate-password');

      var password = generator.generate({
        length: 7,
        numbers: true
      })

      Auth.findOne({ Email: Email }, (err, user) => {
        if(!user){
          return res.status(404).json({ 
            success: false, 
            message: 'User email not found!'
            });


        }else{
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) throw err;
              password = hash;
              
              Auth.updateOne(password)
                  return res.status(201).json({
                      success: true,
                      message: "New Password sent",
                      
                  })
                
               
            });
          });
           
        }
      })

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'dimeapp12@gmail.com',
          pass: 'Dime!@#$'
        }
      })

      var mailOptions = {
        from: 'dimeapp12@gmail.com',
        to: Email,
        subject: 'password recovery text',
        text: password
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          return res.status(500).json({
            success: false,
            error: 'email failed to send'
        }) 
        } else {
          console.log('Email sent: ' + info.response);
          return res.status(200).json({ 
            success: true,
            message: "email sent: " + info.response
        })
        }
      });
    
    }catch(err){

    }
}

exports.getUsers = async (req, res, next)=>{
    try{
        const accounts = await Auth.find();

        return res.status(200).json({ 
            success: true,
            count: accounts.length,
            data: accounts
        })
    }catch (err){
        return res.status(500).json({
            success: false,
            error: 'server error'
        }) 
    }
}