import { deleteImage } from "./cloudinary.js";

/**
 *  Delete image in cloudinary
 * @param {[{String}] | undefined} data - Array of objects with the id_image  
 */

export const deleteImageCloud = async (data) => {
  try {
    // validate if the user has an image
    const idImage = data?.[0]?.id_image;

    if (typeof idImage !== "object") {
      // delete image in cloudinary
      await deleteImage(idImage);
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
