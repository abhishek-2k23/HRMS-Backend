export const logout = async(req,res) => {
    try{
        res.clearCookie("user-cookie");

        return res.status(200).json({
            status : true,
            message : "logged out successfully"

        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            status : false,
            message : "server error"

        })
    }
}