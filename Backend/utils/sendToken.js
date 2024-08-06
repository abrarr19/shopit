export default (user, statusCode, res) =>{

    // create Token 

    const token =user.getJwtToken();

    //option for cookie
    const options ={

        expires: new Date(
            
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60* 60* 1000
        
        ),

        httpOnly: true,
        secure: true 
        

    }

    // console.log(options)

    res.status(statusCode).cookie("Token", token, options).json(
        {
            token
        }
    )
}