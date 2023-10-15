import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDINARY_KEY,
  CLOUDINARY_NAME,
  CLOUDINARY_SECRET,
} from "../../config.js";

// Create object of configuration
cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
  secure: true,
});

// upload of image
export async function uploadImage(filePath) {
  return await cloudinary.uploader.upload(filePath, {
    folder: "dev-states",
  });
}

// delete image
export async function deleteImage(public_id) {
  return await cloudinary.uploader.destroy(public_id, {
    folder: "dev-states",
    invalidate: false,
    resource_type: "image",
  });
}
