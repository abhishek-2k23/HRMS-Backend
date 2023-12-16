import posts from "../Models/post.js";
import users from "../Models/user.js";
import {v2 as cloudinary} from "cloudinary";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//fetch all post
export const getPosts = async (req, res) => {
  try {
    //if there is cat
    const cat = req.query.cat;

    if (!(cat == undefined)) {
      try {
        //finding the post with category
        const postData = await posts.find({ cat: cat });

        console.log("working good ->getPostsWithCat");
        return res.status(200).json({
          status: true,
          message: `Post with category ${cat} found.`,
          data: postData,
        });
      } catch (err) {
        console.log("Error ->getPostsWithCat :", err);

        return res.status(500).json({
          status: false,
          message: "Server Error in fetching Post with category",
          Error: err.message,
        });
      }
    }
    //finding the all postData without any category
    const postData = await posts.find();

    console.log("working good ->getPosts");
    return res.status(200).json({
      status: true,
      message: "all post fetched",
      data: postData,
    });
  } catch (err) {
    console.log("Error ->getPosts :", err);

    return res.status(500).json({
      status: false,
      message: "Server Error in fetching Posts",
      Error: err.message,
    });
  }
};

//fetching the single Post
export const getPost = async (req, res) => {
  try {
    //get the postid from the params
    const postID = req.params.id;

    //find the post with postID
    let postData = await posts.findById(postID);

    //find the user of the post
    const user = await users.findById(postData.User);

    //add username with the postData
     postData = postData.toObject();
     postData.name = user.name;

    //  console.log("single post data, " ,postData)

    console.log("working good ->getPost");
    return res.status(200).json({
      status: true,
      message: `post fetched of postID = ${postID}`,
      data: postData,
      
    });
  } catch (err) {
    console.log("Error ->getPosts :", err);

    return res.status(500).json({
      status: false,
      message: "Server Error in fetching Posts",
      Error: err.message,
    });
  }
};

//deleting the Post
export const deletePost = async (req, res) => {
  try {
    //get the postid from the params
    const postID = req.params.id;

    //first find what post to delete
    const postData = await posts.findById(postID);

    //find the author of the post
    const user = await users.findById(postData.User);

    //updating the user Post data
    user.Post = user.Post.filter((ID) => ID.toString() !== postID);

    //now save the updated user Data.
    const updatedUser = await user.save();

    //now delete the post
    const deletedPost = await posts.findByIdAndRemove(postID);

    return res.status(200).json({
      status: true,
      message: `post deleted of postID = ${postID}`,
      Deleted_Post: deletedPost,
      Updated_User: updatedUser,
    });
  } catch (err) {
    console.log("Error ->deletePost :", err);

    return res.status(500).json({
      status: false,
      message: "Server Error in deleting Posts",
      Error: err.message,
    });
  }
};

//updating the Post
export const updatePost = async (req, res) => {
  try {
    //get the postid from the params
    const postID = req.params.id;

    //find the post and update
    const postData = await posts.findByIdAndUpdate(postID, req.body);

    return res.status(200).json({
      status: true,
      message: `post updated of postID = ${postID}`,
      data: postData,
    });
  } catch (err) {
    console.log("Error ->updatePosts :", err);

    return res.status(500).json({
      status: false,
      message: "Server Error in Updating Posts",
      Error: err.message,
    });
  }
};

//Create the post
export const addPost = async (req, res) => {
  try {
    //fetch the data from frontend
    const { title, desc, cat, img, token } = req.body;

    //if token is missing
    if(!token){
        return res.status(401).json({
            status : false,
            message : "Token missing",
        })
    }

    //check for the details
    if(!title || !desc || !cat){
        return res.status(401).json({
            status : false,
            message : "Fill all details.",
        })
        
    }

    //verify the token
    // const decode = jwt.verify(token,process.env.JWT_SECRET);
    // console.log(typeof(decode))
    // console.log("decode : ",decode);

    //find user to add post data 
    // const user = await users.find({decode.id});

    // token is coming in the form of string so convert them into the Object
    const tokenOBJ = JSON.parse(token);
    //add postdata to database
    const postData = await posts.create({title,desc,img,cat,User:tokenOBJ._id});
    
    //add postID to the userDatabase
    const updatedUser = await users.findByIdAndUpdate(tokenOBJ._id,{$push : {Post : postData._id}},{new : true});

    return res.status(200).json({
        status : true,
        message : "Post created.",
        data : postData,
        user : updatedUser,
    })

  } catch (err) {
    console.log("Error ->addPost :", err);

    return res.status(500).json({
      status: false,
      message: "Server Error in adding Posts",
      Error: err.message,
    });
  }
};

//upload file temperoraly
export const uploadTemp = async (req, res) => {
  try {
    //fetching the file
    const image = req.files.file;

    //path to store file temperoraly
    let path = __dirname + "/file/" + Date.now() + `.${image.split(".")[1]}`;
    console.log("Path : ", path);

    //move the file to path
    image.mv(path, (err) => {
      console.log("Error in moving the image");
    });

    console.log("File uploaded locally for temperoraly");
    res.json({ status: true, message: "File uploaded locally." });
  } catch (err) {
    console.log("Error ->tempUpload :", err);

    return res.status(500).json({
      status: false,
      message: "Server Error in Uploading file in temp",
      Error: err.message,
    });
  }
};

//upload the file to the cloudinary
export const uploadToCloudinary = async (req, res) => {
  try {
    //fetching the file
    const image = req.files.file;

    //file supported type
    const supportedType = ["jpg", "jpeg", "png"];

    // console.log(image);
    //check for the supported type
    const imageType = image.name.split(".")[1];

    if (supportedType.includes(imageType)) {
      //options for file upload
      const folder = "BlogAppAssets";
      let options = { folder};
      

      //uploading file to cloudinary
      const response = await cloudinary.uploader.upload(
        image.tempFilePath,
        options
      );
      // console.log("File uploaded to cloudinary : ", response);

      res
        .status(200)
        .json({
          status: true,
          message: "File uploaded locally.",
          img: response.secure_url,
        });
    } else {
      return res.status(401).json({
        status: false,
        message: "Image type not supported.",
      });
    }
  } catch (err) {
    console.log("Error ->cloudUpload :", err);

    return res.status(500).json({
      status: false,
      message: "Server Error in Uploading file in Cloud",
      Error: err.message,
    });
  }
};
