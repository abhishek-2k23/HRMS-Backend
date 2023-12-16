import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnection = () =>{

        mongoose.connect(process.env.DB_URL,{
            useNewUrlParser : true,
            useUnifiedTopology : true,
        }).then(() => {console.log("DB connection Done.")})
        .catch(() => console.log("Error in connection of DB"))
   
}

export default dbConnection;