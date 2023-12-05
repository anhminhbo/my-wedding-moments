const { PhotoModel } = require("../../models");
const { uploadFile } = require("./utilities");
const Error = require("../../config/constant/Error");
const ResponseService = require("../response/response.service");

const {
  GROOM_FOLDER,
  BRIDE_FOLDER,
  GENERAL_FOLDER,
} = require("../../config/constant/Env");

const uploadPhotos = async (files, category) => {
  const gDriveFolderParent =
    category === "bride"
      ? BRIDE_FOLDER
      : category === "groom"
      ? GROOM_FOLDER
      : GENERAL_FOLDER;

  // Upload each photo
  for (let f = 0; f < files.length; f += 1) {
    const result = await uploadFile(files[f], gDriveFolderParent);

    if (!result || !Object.keys(result).length) {
      throw ResponseService.newError(
        Error.UnableToUploadPhoto.errCode,
        Error.UnableToUploadPhoto.errMessage
      );
    }

    // **Calculate index**
    // Calculate the total count of documents in PhotoModel
    const totalCount = await PhotoModel.countDocuments();

    // Calculate index based on total count
    const index = totalCount + 1;

    // **Calculate page**
    const page = Math.ceil(index / 10) < 1 ? 1 : Math.ceil(index / 10);

    // Save photo document
    const photoToBeCreate = new PhotoModel({
      gDriveId: result.id,
      name: result.name,
      gDriveUrl: `https://drive.google.com/uc?export=view&id=${result.id}`,
      index,
      page,
      category,
    });
    await photoToBeCreate.save();
  }

  return true;
};

module.exports = { uploadPhotos };
