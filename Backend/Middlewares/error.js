import errorHandler from "../utils/errorHandler.js"
export default (err,req,res,next)=>{

     let error={
        statusCode:err?.statusCode || 500,
        message:err?.message || " Internal Server Error"
     }


   //   handle mongooseid error

     if(err?.name==="CastError")
     {

      const message=`Resource not found ${err?.path}`
      error= new errorHandler(message,404)

     }

     //   handle validation error

     if(err?.name==="ValidationError")
      {
 
       const message=Object.values(err.errors).map((values)=>values.message)
       error= new errorHandler(message,400)
 
      }
 
     if(process.env.NODE_ENV=="DEVELOPMENT"){

      res.status(error.statusCode).json({
         message:error.message,
         error:err,
         stack:err?.stack
      })
 }
     }
     if(process.env.NODE_ENV=="PRODUCTION"){

      res.status(error.statusCode).json({
         message:error.message
      })
 }
     

    