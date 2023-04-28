import userModel from '../model/userModel.js';
import { comparePassword, hashPassword } from '../Helpers/authHelper.js';
import JWT from 'jsonwebtoken';

export const registerController = async (req,res) => {
    try {
        const {username,email,password,answer} = req.body;
        //validation
        if(!username){
            return res.send({message:'Name is required'})
        }
        if(!email){
            return res.send({message:'Email is required'})
        }
        if(!password){
            return res.send({message:'Password is required'})
        }
        if(!answer){
            return res.send({message:'Birth year is required'})
        }
        // check item
        const existingUser = await userModel.findOne({email})
        // existing item
        if(existingUser){
            return res.status(200).send({
                success: false,
                message: 'Account already exists. Please Log in'
            })
        }
        // register user
        const hashedPassword = await hashPassword(password);
        // save user
        const user = await new userModel({username,email,password: hashedPassword,answer}).save()

        res.status(201).send({
            success: true,
            message: 'User successfully registered',
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        })
    }
}
// POST LOGIN
export const loginController = async (req,res) => {
    try {
        const {email,password} = req.body;
        // validation
        if(!email || !password){
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",

            })
        }
        // check user
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success: false,
                message: "email not registered"
            })
        }
        const match = await comparePassword(password,user.password);
        if(!match){
            return res.status(200).send({
                success: false,
                message: "Invalid password"
            })
        }
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
        res.status(200).send({
            success: true,
            message: "Login successful",
            user:{
                username: user.username,
                email: user.email,
                role: user.role
            },
            token
        })
    } 
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error
        })
    }
}

// forgotPasswordController
export const forgotPasswordController = async (req,res) => {
    try {
        const {email,answer,newPassword} = req.body;
        if(!email){
            res.status(400).send({
                message: "Email is required"
            })
        }
        if(!answer){
            res.status(400).send({
                message: "Answer is required"
            })
        }
        if(!newPassword){
            res.status(400).send({
                message: "New Password is required"
            })
        }
        // check
        const user = await userModel.findOne({email,answer})
        // validation
        if(!user){
            return res.status(404).send({
                success: false,
                message: "Wrong email or answer",

            })
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id,{password: hashed})
        res.status(200).send({
            success: true,
            message: "Password reset successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}

// test controller

export const testController = (req,res) =>{
    res.send("Protected Route");
}

// update profile
export const updateProfileController = async(req,res) => {
    try {
        const {username, email, password} = req.body
        const user = await userModel.findById(req.user._id)
        // password
        if(password && password.length < 6){
            return res.json({error: "password is required and must be minimum 6 characters"})
        }
        const hashedPassword = password? await hashPassword(password) : undefined

        const updatedUser = await userModel.findByIdAndUpdate(req.user._id,{
            username: username || user.username, 
            password: hashedPassword || user.password,
            email: email || user.password},
            
            {new:true})

        res.status(200).send({
            success: true,
            message: "Profile Updated Successfully",
            updatedUser
        })
    } catch (error) {
        console.log(error);
        res.status(400).send()({
           success: false,
           message: "Error while updating profile",
           error 
        })
    }
}