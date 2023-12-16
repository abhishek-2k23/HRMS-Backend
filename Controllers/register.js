import users from "../Models/user.js";
import bcrypt from "bcrypt";
export const register = async (req,res) =>{
    try{
        const {PersonalDetails,JobDetails,Education,Experience} = req.body;
        console.log("Exprience : ",Experience);
        //extract the Email and Mobile number
        const {Email,Mobile} = PersonalDetails;

        if(!PersonalDetails || !JobDetails || !Education || !Experience){
            console.log("Enter all details");
            return res.status(404).json({
                status : false,
                message : "Enter all details"
            })
        }

        //check for the user Existence 
        const existingUser = await users.findOne({
            $or: [{ 'PersonalDetails.Email': Email }, { 'PersonalDetails.Mobile': Mobile }],
          });

        //if User exist already
        if(existingUser){
            return res.status(409).json({
                status : false,
                message : "User already exist"
            })
        }

        //encrypt the password 
        const hashPassword = await bcrypt.hash(PersonalDetails.Password,10);

        const newuser = new users({
            PersonalDetails:{...PersonalDetails,Password : hashPassword},JobDetails,Education,Experience
        });

        //user data save to the db;
        const userData = await newuser.save();

        console.log("userData : \n",userData)
        //send response
        return res.status(201).json({
            status : true,
            message : "You are registed successfully",
            user : userData,
        })
    }catch(err){
        console.log('Error in Register : ',err.message);
        res.status(500).json({
            status : false,
            message : "Server Error"
        })
    }
}
