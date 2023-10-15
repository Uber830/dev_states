import { isExtension, fileLimit } from "../helpers/isUploadImage.js";

// middleware what validate the long of the name and size
export const validateUploadFiles = (req, res, next) => {
  try {
  
    if (!req?.files) throw new Error("No files were uploaded.");

    // validate extension image
    if (typeof isExtension(req?.files) !== "string")
      return res.status(400).send(isExtension(req?.files));

    // check if the file size is valid and the name length
    if (typeof fileLimit !== "function")
      throw new Error(
        fileLimit(
          req?.files?.image_url?.size,
          req?.files?.image_url?.name
        )
      );

    next();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
