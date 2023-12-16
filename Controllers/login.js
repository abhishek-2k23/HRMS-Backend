import users from "../Models/user.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

export const login = async (req,res) => {
    try{
        const {Email,Mobile,Password} = req.body;

        //check for the data came
        if((!Email && !Mobile) || !Password ){
            return res.status(404).json({
                status : false,
                message : "Enter Required Details"
            })
        }

        //check for the user exist or not
        let userExist = await users.findOne({$or:[{'PersonalDetails.Email' : Email},{'PersonalDetails.Mobile' : Mobile}]}).lean();


        //in case not exist user
        if(!userExist){
            console.log("User Not exist");
            return res.status(404).json({
                status : false,
                message : "User not exist. Try with another details."
            })
        }

        //if exist then check for the password
        const passwordMatch = await bcrypt.compare(Password,userExist.PersonalDetails.Password);

        //password not matched 
        if(!passwordMatch){
            console.log("Passoword is incorrect");
            return res.status(404).json({
                status : false,
                message : "Passoword is incorrect"
            })
        }

        //password matched conditon

        //payload for token
        const payload = { 
            Email : userExist.PersonalDetails.Email,
            id : userExist._id,
            Name : userExist.PersonalDetails.Name,
            Role : userExist.JobDetails.Role
        }

        //generate token
        const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn : "3 days"})

        //options for cookie
        const options = {
            expires : new Date(Date.now()+3*24*60*60*1000),
            httpOnly : true,
            secure : true,
        }

        //adding token and removing password from userdata 
        userExist.PersonalDetails.Password = undefined
        userExist = userExist.PersonalDetails;
        userExist.token = token;

        console.log("logged in ");
        return res.cookie("userCookie",token,options).status(200).json({
            status : true,
            message : "You are logged in",
            data : userExist,
        })

    }catch(err){
        console.log('Error in Register : ',err.message);
        res.status(500).json({
            status : false,
            message : "Server Error"
        })
    }
}