const bcrypt =  require('bcrypt');
const User = require('../Models/user');
const express = require('express');
const router = express.Router();

//signup route
router.post('/signup',async(req,res)=>{
    try{
        //taking password from user
        const plainPassword = req.body.password;

        // scrambling the password
        const hashedPassword= await bcrypt.hash(plainPassword,10);//10 is salt in brcypt
        //saving user password in database
        const user = await User.create({
            email:req.body.email,
            password:hashedPassword,
        });
        res.status(201).json({message:"User created successfully"},user)
    }
    catch(e){
         res.status(500).json({ error: e.message });
    }
})
module.exports = router;
