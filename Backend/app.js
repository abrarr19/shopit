import express from "express";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/Products.js"
import auhtRoutes from "./routes/auth.js"



const app=express();

app.use(express.json());
app.use(cookieParser());



import dotenv from "dotenv";

//handle uncaught exception 

process.on("uncaughtException",(err)=>{

    console.log(`Uncaught exception error= ${err}`)
    console.log("Shutting down server due to unhandled rejection")
    server.close(()=>{

        process.exit(1)
    })
})

dotenv.config({ path: "Backend/config/config.env"})

import { ConnectDatabase } from "./config/dbConnect.js";
import errorMiddleWare from "../Backend/Middlewares/error.js"


//connect to database

ConnectDatabase()

// app.use(express.json());
app.use(errorMiddleWare);
// app.use(cookieParser());
//import all results 

app.use("/api/v1",productRoutes)
app.use("/api/v1",auhtRoutes)

app.get("/",(req,res)=>
    {
        console.log("server running ")
    })





const server=app.listen(process.env.PORT,()=>
{ console.log(`server running on ${process.env.PORT} in ${process.env.NODE_ENV} mode`)


})

//unhandled rejection

process.on("unhandledRejection",(err)=>{

    console.log(`Unhandled rejection error= ${err}`)
    console.log("Shutting down server due to unhandled rejection")
    server.close(()=>{

        process.exit(1)
    })
})