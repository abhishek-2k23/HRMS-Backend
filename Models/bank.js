import mongoose from "mongoose";

const bankSchema = new mongoose.Schema({
    EmployeeID : {
        type : String,
        required : true,
        unique : true,
    },
    Name : {
        type : String,
        required : true,
    },
    AccountNo : {
        type : Number,
        required : true,
    },
    Branch : {
        type : String,
        required : true,
    },
    IFSC : {
        type : String,
        required : true,
    },
    PF : {
        type : String,
        required : true,
    },
    ESICNO : {
        type : Number,
        required : true,
    }
},{timestamps : true});

const Bank = mongoose.model("Bank",bankSchema);

export default Bank;