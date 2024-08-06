import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import CatchAsyncErrors from "./CatchAsyncErrors.js";
import User from "../models/user.js";

//check if the user is authenticated
 export const isAuthenticatedUser= CatchAsyncErrors ( async (req, res, next)=>{

    const {token}= req.cookies;

    console.log(token)

    // if(!token){

    //     return next(new ErrorHandler("Login first to access the site", 401))
    // }


    // const decode =jwt.verify(token,process.env.JWT_SECRET)

    // req.user = await User.findById(decode.id)

    next()


})

//Authorize Roles admin and User

export const authorizedRole=(...roles)=>{

    return (req, res, next)=>{

        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`role  is not authorized to access this resource`, 403))
        }
        next()
    }

    
}