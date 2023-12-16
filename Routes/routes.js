import express from "express";

// //router initialization
const router = express.Router();

//controllers
import {register} from "../Controllers/register.js";
import { login } from "../Controllers/login.js";
import { bank } from "../Controllers/bank.js";
import { getEmployeeDetails,getBankDetails } from "../Controllers/getdata.js";
import { uploadToCloudinary } from "../Controllers/uploadpic.js";
import { logout } from "../Controllers/logout.js";

// //creating routes for user
router.post("/register",register);
router.post("/login",login);
router.get("/logout",logout);
router.get("/getEmployeeDetails",getEmployeeDetails);

//banking details
router.post("/addBankDetails",bank);
router.get("/getBankDetails",getBankDetails);

//uploading pic
router.post("/uploadPIC",uploadToCloudinary)


// //exporting Router
export default router;