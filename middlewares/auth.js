import { User } from "../models/userModel.js";
import jwt from 'jsonwebtoken';


export const isAuth = async (req, res, next) => {

    try {

        const token = req.headers.token;
        console.log(token);

        if(!token)
            {
            return res.status(403).json({
                    message: "Please login token not found",
                });
            }
        
        // token contain _id userController ln=65
        const decode = jwt.verify(token , process.env.JWT_SECRET);

        req.user = await User.findById(decode._id);  // we send the _id to user
        // so user can get id by user._id

        next();
        
    } catch (error) {
        res.status(500).json({
            message:"Login First",
        });
    }
    
};