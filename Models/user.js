import mongoose from "mongoose";
import { statesAndUTs } from "../constant.js";

const userschema = new mongoose.Schema({
    PersonalDetails : {
        Department :{
            type : String,
            required : true,
        },
        Name : {
            type : String,
            required : true,
        },
        Gender : {
            type : String,
            enum : ['Male','Female'],
            required : true,
        },
        Email : {
            type : String,
            required : true,
            unique : true,
        },
        Mobile : {
            type : Number,
            required : true,
            unique : true,
        },
        DateOfBirth : {
            type : Date,
            required : true,
        },
        FatherName : {
            type : String,
        },
        HusbandName : {
            type : String,
        },
        AadharNo : {
            type : Number,
        },
        Password : {
            type : String,
            required : true,
        },
        State : {
            type : String,
            enum : Object.keys(statesAndUTs),
            required : true,
        },
        City : {
            type : String,
            required : true,
        },
        Address : {
            type : String,
            required : true,
        },
        Image : {
            type : String,

        },
        MaritalStatus : {
            type : Boolean,
            required : true,
        }
    },
    
    JobDetails : {
        DateOfJoining : {
            type : Date,
            required :true,
        },
        BasicSalary : {
            type : String,
            required  : true,
        },
        Location : {
            type : String,
            required : true,
        },
        Role : {
            type : String,
            enum : ['Admin','Employee'],
            required : true,
        },
    },

    Education : [{
        University : {
            type : String,
            required  : true,
        },
        Qualification : {
            type : String,
            required : true,
        },
        Grade : {
            type : String,
            required : true,
        }
    }],

    Experience : [{
        Organization : {
            type : String,
            required  : true,
        },
        Designation : {
            type : String,
            required : true,
        },
        Working : {
            type : String,
            required : true,
        }
    }],
    
},{timestamps : true});
const users = mongoose.model("users",userschema);
export default users;