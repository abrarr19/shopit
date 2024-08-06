import mongoose, { Mongoose } from "mongoose";

const productSchema= new mongoose.Schema({

    name:{
        type:String,
        required:[true,"please enter the product name"],
        maxLength:[200,"name should not exceed 200 characters"]

    },

    price:{
        type:Number,
        required:[true,"please enter the product name"],
        maxLength:[200,"name should not exceed 200 characters"]

    },
    description:{
        type:String,
        required:[true,"please enter the description"],
        

    },
    rating:{
        type:Number,
        default:0
    },

    images:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }],

    category:{
        type:String,
        required: [true, "please enter the category"],
        enum:{

            values:["Laptops","phones","Electronics","Food","Headphones","Accessories","Cameras"],
            message:"select the category"
        }
    },

    seller:{
        type:String,
        required:[true,"please enter the seller name"],
        maxLength:[200,"name should not exceed 200 characters"]

    },
    stock:{
        type:Number,
        required:[true,"please enter the product stock"],
        

    },
    numOfReviews:{
        type:Number,
        default:0
    },

    reviews:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:false
            },
            rating:{
                type:Number,
                required:true,
            },
            comments:{
                type:String,
                required:true
            }
        }
    ],

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:false
    }



},{timestamps:true})

export default mongoose.model("product",productSchema)