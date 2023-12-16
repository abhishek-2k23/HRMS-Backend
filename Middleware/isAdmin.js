import users from "../Models/user.js";
export const isAdmin = async (req,res,next) => {
    try{
        if(req.Role !== "Admin"){
            return res.status(401).json({
                status : false,
                message : "This is admin protected route",
            })
        }
        next();
    }catch(err){
        console.log(err);
        return res.status(500).json({
            status : false,
            Error : err.message,
            message : "Server error",
        })
    }
}