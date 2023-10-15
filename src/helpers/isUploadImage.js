// just this extensions are valid
let validExtensions = ["png", "jpg", "gif", "jpeg"];

//validate filezise and length of the name
export const fileLimit = (size, name) => {
  if (name.length >= 20) {
    throw new Error(
      `The file name is longer than 20 characters, actually ${name.length}`
    );
  }

  if (size >= 1048576) {
    throw new Error(`The file size is larger than 1MB, actually ${size} bytes`);
  }
};

const fileValue = ({ image_url }) => {
  // obtain a name from the current file
  let name = image_url?.name;
  let size = image_url?.size;
  let nameSplit = name.split(".");

  fileLimit(size, nameSplit[0]);
  let fileExtension = nameSplit.at(-1);
  let isValid = validExtensions.indexOf(fileExtension) < 0;

  return isValid ? false : fileExtension;
};

// check if the extension is valid
export const isExtension = (fileObject) => {

  // ressponse boolean or string
  const extension = fileValue(fileObject);

  if (!extension) {
    throw new Error(
      "The file extension is not valid, just this extensions are valiad: png, jpg, gif, jpeg"
    );
  }
  return extension;
};
