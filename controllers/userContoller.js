// Shree Radha

import sendMail from '../middlewares/sendMail.js';
import {User} from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {


    try{

        const {email} = req.body;
        let    user   = await User.findOne({ email });

        if(!user)
        {
            user = await User.create({ email });  //when we create a new user then in user we get _id and email
        }

        const otp = Math.floor(Math.random() * 1000);
        
        await sendMail(email, "Welcome to ConvoAI",otp);

        // create token  //first we verify token then we send token on verifyToken component
        const verifyToken = jwt.sign( {user,otp} , process.env.JWT_SECRET, {expiresIn: "10m",});

        res.json({
            message: "Otp send to your mail",
            verifyToken,
        });
        

    }catch(e){
        res.status(500).json({
            message: e.message,
        });
    }

};



export const verifyUser = async (req,res)=> {
    try {

        const {otp,verifyToken} = req.body;

        const verify = jwt.verify(verifyToken,process.env.JWT_SECRET);
        // verify takes {user,otp} line 22

        if(!verify)
        {
            return res.status(400).json({
                message: "Otp Expired",
            });
        }

        console.log(verify.otp);
        console.log(otp)

        if(verify.otp !== otp)
        {
            return res.status(400).json({
                message: "Wrong Otp",
            });
        }

        const token = jwt.sign( { _id: verify.user._id }, process.env.JWT_SECRET, { expiresIn:'5d'});

        res.json({
            message: "Logged in successfully",
            user: verify.user,  //important
            token,
        });
        
    } catch (e) {
        res.status(500).json({
            message: e.message,
        });
    }

};

 
export const myProfile = async (req, res )=> {
   
    try {
        const user = await User.findById(req.user._id);  //auth.js ln=20
        res.json(user);
  
    } catch (error) {
        console.log("error in myProfile");

        res.status(500).json({
            message: error.message,
        });
   }
   
};