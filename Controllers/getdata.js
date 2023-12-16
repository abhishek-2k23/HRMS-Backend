import Bank from "../Models/bank.js";
import users from '../Models/user.js';

export const getEmployeeDetails = async(req,res) => {
    try{
        const data = await users.find({});
        return res.status(200).json({
            status : true,
            message : "all data fetched",
            data : data,
        })
    }catch(err){
        console.log("Server Error : ",err.message );

        return res.status(500).json({
            status : false,
            message : "Server Error",
        })
    }
}
export const getBankDetails = async(req,res) => {
    try{
        const data = await Bank.find({});
        return res.status(200).json({
            status : true,
            message : "all data fetched",
            data : data,
        })
    }catch(err){
        console.log("Server Error : ",err.message );

        return res.status(500).json({
            status : false,
            message : "Server Error",
        })
    }
}