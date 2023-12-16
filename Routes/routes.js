import express from "express";

// //router initialization
const router = express.Router();

//controllers
import {register} from "../Controllers/register.js";
import { login } from "../Controllers/login.js";
import { bank } from "../Controllers/bank.js";
import { getEmployeeDetails,getBankDetails } from "../Controllers/getdata.js";
import { uploadToCloudinary } from "../Controllers/uploadpic.js";

// //creating routes
router.post("/register",register);
router.post("/login",login);
router.post("/addBankDetails",bank);
router.get("/getEmployeeDetails",getEmployeeDetails);
router.get("/getBankDetails",getBankDetails);
router.post("/uploadPIC",uploadToCloudinary)


// //exporting Router
export default router;