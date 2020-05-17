const express=require('express');
const User   =require('../models/User');
const bcrypt =require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt    =require('jsonwebtoken');
const config  =require('config');
const router =express.Router();
const auth   =require('../middleware/auth');
//@route - get /api/user
//@desc  - get logged in user
//@access- private
router.get('/',auth,async (req,res)=>{
   
try {
    let user= await User.findById(req.user.id).select('-password');
     res.json(user);

} catch (err) {
    
console.error(err.message);
res.status(500).send('server error');

}


});

//@route - post /api/user
//@desc  - register a new user
//@access- public 

router.post('/',[
 check('name','Name is required').not().isEmpty(),
 check('email','Please enter a valid Email').isEmail(),
 check('password','Password should be of minimum 6 characters').isLength({min:6})

],async (req,res)=>{
   const errors= validationResult(req);
   if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()});
   }

    const {name, email, password}=req.body;
    try {
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg: "user already exists"});
        }
        user= new User({     
            name,
            email,
            password
        });

     const salt= await bcrypt.genSalt(10);

     user.password= await bcrypt.hash(password,salt);
     
     await user.save();

     const payload={
         user:{
             id:user.id
         }
     }
      
     jwt.sign(payload,config.get('jwtSecret'),{
         expiresIn:360000
     },(err,token)=>{
         if(err) throw err;
         res.json({token});
     });



    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
   
});

module.exports=router;

