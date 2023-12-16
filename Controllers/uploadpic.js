import {v2 as cloudinary} from 'cloudinary';
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
        const folder = "HRMS";
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
            message: "File uploaded successfully.",
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