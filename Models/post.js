import mongoose from "mongoose";

const postschema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    desc : {
        type : String,
        required : true,
    },
    cat : {
        type : String,
        required : true,
    },
    img : {
        type : String, 

    },
    date:{
        type : Date,
        required : true,
        default : Date.now(),
    },
    User : {
        type :  mongoose.Schema.Types.ObjectId,
        ref : "users",
        required : true,
    }
});

const posts = mongoose.model("posts",postschema);
export default posts;