import mongoose, { model } from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

const userSchema= new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxLength:[50,"name should not exceed 50 characters"]

    },

    email:{
        type:String,
        required:[true,"Please Enter Your email address"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minLength:[6,"Password should not be less than 6 characters"],
        select:false

    },
    avatar :
    {
        public_id: String,
        url: String
    },

    role:{
        type: String,
        default:"user"
    },

    resetPasswordToken: String,
    resetPasswordExpiry: Date,
    



},{timestamps: true})

//encrypt password using  brcypt and pre fucnction

userSchema.pre("save", async function (next){

    if(!this.isModified("password")){
        next()
    }

    this.password= await bcrypt.hash(this.password, 10)
})

//return token /jwt

userSchema.methods.getJwtToken = function() {

     return jwt.sign({id:this._id},process.env.JWT_SECRET, {

        expiresIn: process.env.JWT_EXPIRE
     })
    
}

//compare password

userSchema.methods.comparePassword = async function(enteredPassword){

   return  await bcrypt.compare(enteredPassword,this.password)
}

export default mongoose.model("User",userSchema)