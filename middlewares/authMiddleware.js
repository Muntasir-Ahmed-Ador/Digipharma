import JWT from 'jsonwebtoken';
import userModel from '../model/userModel.js';

// protected routes token base

export const requireSignIn = async (req,res,next) =>{
    // req is sent, if next is validated, res is shown
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
}
// admin access

export const isAdmin = async (req,res,next) =>{
    try {
        const user = await userModel.findById(req.user._id)
        if(user.role !== 1){
            return res.status(401).send({
                success: false,
                message: "Unauthorized access"
            })
        }
        else{
            next();
        }
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            message: "Error in admin middleware",
            error,
        })
    }
} 