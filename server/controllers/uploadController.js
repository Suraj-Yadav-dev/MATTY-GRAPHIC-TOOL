// server/controllers/uploadController.js
import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    const fileStr = req.body.data; // base64 or file URL
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      folder: "matty",
    });
    res.json({ url: uploadedResponse.secure_url });
  } catch (error) {
    res.status(500).json({ message: "Image upload failed", error: error.message });
  }
};
