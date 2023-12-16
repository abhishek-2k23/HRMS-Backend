import express from "express";

//router initialization
const postRouter = express.Router();

//controller imports
import { getPosts ,getPost,deletePost,updatePost,uploadToCloudinary,addPost} from "../Controllers/post.js";

//creating routes
postRouter.get("/",getPosts);
postRouter.get("/:id",getPost);
postRouter.delete("/:id",deletePost);
postRouter.put("/:id",updatePost);
postRouter.post("/upload",uploadToCloudinary);
postRouter.post("/addPost",addPost);


//exporting Router
export default postRouter;