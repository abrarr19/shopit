import mongoose from "mongoose";

export const ConnectDatabase= () =>
{
       let DB_URI=""

       if(process.env.NODE_ENV=="DEVELOPMENT") DB_URI=process.env.DB_LOCAL_URI;
       if(process.env.NODE_ENV=="PRODUCTION") DB_URI=process.env.DB_LOCAL_URI;


       
    mongoose.connect(DB_URI).then((con)=>{

        console.log(`database connected to host ${con?.connection?.host}`)
    })
}