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

//middleware imports
import { auth } from "../Middleware/auth.js";
import { isAdmin } from "../Middleware/isAdmin.js";

// //creating routes for user
router.post("/register",auth,isAdmin,register);
router.post("/login",login);
router.get("/logout",logout);
router.get("/getEmployeeDetails",auth,isAdmin,getEmployeeDetails);


//banking details
router.post("/addBankDetails",bank);
router.get("/getBankDetails",getBankDetails);

//uploading pic
router.post("/uploadPIC",uploadToCloudinary)


// //exporting Router
export default router;