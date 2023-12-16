import users from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//for registration
export const register = async (req, res) => {
  try {
    //extract the data
    const { email, name, password } = req.body;

    //check the data
    if (!email || !name || !password) {
      return res.status(402).json({
        status: false,
        message: "Enter all the fields",
      });
    }

    //check for userExists
    const userExist = await users.find({email});

    //now convert this userExist to array to check 
    // console.log(userExist);
    // console.log(userExist.length);

    if(userExist.length > 0){
        return res.status(401).json({
            status : false,
            message : "user already exists",
        })
    }

    //hashing the password
    const hashPassword = await bcrypt.hash(password, 5);

    //saving the info to the db
    const user = await users.create({ email, name, password: hashPassword });

    return res.status(200).json({
      status: true,
      message: "You are registered successfully.",
      data: user,
    });
  } catch (err) {
    console.log("Error ->Register :", err.message);

    return res.status(500).json({
      status: false,
      message: "Server Error in register",
      Error: err.message,
    });
  }
};

//for login
export const login = async (req, res) => {
  try {
    //extract the data
    const { email, password } = req.body;

    //check the data
    if (!email || !password) {
      return res.status(402).json({
        status: false,
        message: "Enter all the fields",
      });
    }

    //now check for the user
    let userExist = await users.findOne({email});

    if (!userExist) {
      return res.status(401).json({
        status: false,
        message: "User not registed.",
      });
    }
    // console.log("userExist : ",userExist);
    //if user exist then check for the password
    if (await bcrypt.compare(password, userExist.password)) {

        //payload for token generation
        const payload = {
            email : userExist.email,
            name : userExist.name,
            id : userExist._id,
        }

        //generate token
        const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn : "2h"});

        //options for cookie
        const options = {
            expires : new Date(Date.now()+3*24*60*60*1000),
            httpOnly : true,
            sameSite : "none",
        }

        //sending the cookies
        res.cookie("userCookie",token,options);

        //removing the unwanted infos
        userExist = userExist.toObject();
        userExist.password = undefined;
        userExist.token = token;
        userExist.Post = undefined;

        // console.log("user Logged in : ",userExist)
      return res.status(200).json({
        status: true,
        message: "logged in successfully.",
        token : token,
        other : userExist,
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Passoword not matched.",
      });
    }
  } catch (err) {
    console.log("Error ->Register :", err);

    return res.status(500).json({
      status: false,
      message: "Server Error in register",
      Error: err.message,
    });
  }
};

//for logout
export const logout = async (req,res) =>{
    try{
        res.clearCookie("userCookie");

        return res.status(200).json({
            status  : true,
            message : "Logged out successfully",
        })
    }catch (err) {
        console.log("Error ->logout :", err);
    
        return res.status(500).json({
          status: false,
          message: "Server Error in logout",
          Error: err.message,
        });
      }
}
