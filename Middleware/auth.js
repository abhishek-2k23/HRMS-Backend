import jwt from "jsonwebtoken";

export const auth = (req,res,next) => {
    try{
        //fetch token from the cookies
        const token = req.cookies.userCookie;

        //token missing
        if(!token){
            return res.status(404).json({
                status : false,
                message : "Token is missing",
            })
        }   

        //verify token
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
    
            req.Role = decode.Role;
            
            next();

        }catch(e){
            console.log("Error in verifing token",e);
            return res.status(404).json({
                status : false,
                message : "Token verifing issue",

            })
        }
        
    }catch(e){
        console.log(e);
        return res.json({
            status : false,
            message : "Server error in authentication"
        }).status(500)
    }
}