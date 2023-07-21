const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// get credentials from cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "AntonsRareGuitars",
    allowedFormats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 640, height: 640, crop: "limit" }],
  },
});
console.log("services-upload-file");
const upload = multer({ storage: storage });
console.log("services-upload-file2");
module.exports = upload;
