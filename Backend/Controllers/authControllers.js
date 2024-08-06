import CatchAsyncErrors from "../Middlewares/CatchAsyncErrors.js";
import User from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";
 


///Register user
 export const registerUser = CatchAsyncErrors( async (req, res,next)=>{



    const {name, email , password}= req.body

    const user= await User.create({

        name, email, password
    })

    
    sendToken(user,200,res)


 })


 //loginuser
 export const loginUser = CatchAsyncErrors( async (req, res,next)=>{



    const {email , password}= req.body

    if(!email || !password)
    {
        return next(ErrorHandler("Please enter email or Password",400))
    }

    //find user in user database
    const user =  await User.findOne({email}).select("+password")    

    if(!user){

        return next(ErrorHandler("Incorrect email or Password",400))

    }

    //compare password 

    const isMatchedPassword = await user.comparePassword(password)

    if(!isMatchedPassword){

        return next(ErrorHandler("Incorrect email or Password",400))

    }

      sendToken(user,200,res)


 })


 //lOgout user

  //logoutuser
  export const logoutUser = CatchAsyncErrors( async (req, res,next)=>{

   
    res.cookie("Token", null, {
        expires: new Date(Date.now()),
        httpOnly:true 
    })
  res.status(200).json({
    message:"logged out"
  })

 })
