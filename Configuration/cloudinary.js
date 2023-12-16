import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

//now connecting to cloudinary
export const cloudinaryConnect = () =>{
    try{
        cloudinary.config({
            cloud_name : process.env.cloud_name,
            api_key : process.env.api_key,
            api_secret : process.env.api_secret,
        })
        console.log("cloudinary connection done")
    }catch(err){
        console.log("Error in cloudinaryConnect",err.message)
    }
}